import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./d1";

export function createApp(env: Env) {
  const app = new Hono();

  app.use("/*", cors());

  app.use("/*", async (c, next) => {
    const auth = c.req.header("Authorization") || "";
    const prefix = "Bearer ";
    if (!auth.startsWith(prefix)) {
      return c.json({ error: "Missing or invalid Authorization header" }, 401);
    }
    const token = auth.slice(prefix.length).trim();
    if (token === "" || token !== env.API_TOKEN) {
      return c.json({ error: "Invalid token" }, 401);
    }
    await next();
  });

  function asQuiz(row: any) {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      timeLimitSeconds: row.time_limit_seconds ?? undefined,
      isPublished: !!row.is_published,
      createdAt: row.created_at,
    };
  }

  function asQuestion(row: any) {
    let options = undefined;
    if (row.options_json) {
      try {
        options = JSON.parse(row.options_json);
      } catch (e) {
        options = undefined;
      }
    }

    let correctAnswer = row.correct_answer ?? undefined;
    if (row.type === "mcq" && correctAnswer !== undefined) {
      const num = Number(correctAnswer);
      if (!Number.isNaN(num) && Number.isInteger(num) && num >= 0) {
        correctAnswer = num;
      }
    }

    return {
      id: row.id,
      quizId: row.quiz_id,
      type: row.type,
      prompt: row.prompt,
      options,
      correctAnswer,
      position: row.position,
    };
  }

  function nowISO() {
    return new Date().toISOString().replace("T", " ").replace("Z", "");
  }

  // List quizzes
  app.get("/quizzes", async (c) => {
    try {
      const { results } = await env.DB.prepare(
        `SELECT * FROM quizzes ORDER BY created_at DESC`,
      ).all();
      return c.json(results.map(asQuiz));
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to list quizzes" }, 500);
    }
  });

  // Create quiz
  app.post("/quizzes", async (c) => {
    try {
      const body = await c.req.json();
      const { title, description, timeLimitSeconds, isPublished } = body || {};
      if (!title || !description) {
        return c.json({ error: "title and description are required" }, 400);
      }

      const result = await env.DB.prepare(
        `INSERT INTO quizzes (title, description, time_limit_seconds, is_published, created_at) VALUES (?,?,?,?,?)`,
      )
        .bind(
          title,
          description,
          timeLimitSeconds ?? null,
          isPublished ? 1 : 0,
          nowISO(),
        )
        .run();

      const { results } = await env.DB.prepare(
        `SELECT * FROM quizzes WHERE id=?`,
      )
        .bind(result.meta.last_row_id)
        .all();
      return c.json(asQuiz(results[0]), 201);
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to create quiz" }, 500);
    }
  });

  // Get quiz with questions
  app.get("/quizzes/:id", async (c) => {
    try {
      const id = Number(c.req.param("id"));
      const { results: quizRows } = await env.DB.prepare(
        `SELECT * FROM quizzes WHERE id=?`,
      )
        .bind(id)
        .all();

      if (quizRows.length === 0) {
        return c.json({ error: "Quiz not found" }, 404);
      }

      const { results: qRows } = await env.DB.prepare(
        `SELECT * FROM questions WHERE quiz_id=? ORDER BY position ASC, id ASC`,
      )
        .bind(id)
        .all();

      return c.json({
        ...asQuiz(quizRows[0]),
        questions: qRows.map(asQuestion),
      });
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to fetch quiz" }, 500);
    }
  });

  // Update quiz metadata
  app.patch("/quizzes/:id", async (c) => {
    try {
      const id = Number(c.req.param("id"));
      const { results: quizRows } = await env.DB.prepare(
        `SELECT * FROM quizzes WHERE id=?`,
      )
        .bind(id)
        .all();

      if (quizRows.length === 0) {
        return c.json({ error: "Quiz not found" }, 404);
      }

      const body = await c.req.json();
      const { title, description, timeLimitSeconds, isPublished } = body || {};

      await env.DB.prepare(
        `UPDATE quizzes SET title=COALESCE(?, title), description=COALESCE(?, description),
          time_limit_seconds=COALESCE(?, time_limit_seconds), is_published=COALESCE(?, is_published) WHERE id=?`,
      )
        .bind(
          title ?? null,
          description ?? null,
          timeLimitSeconds ?? null,
          isPublished === undefined ? null : isPublished ? 1 : 0,
          id,
        )
        .run();

      const { results } = await env.DB.prepare(
        `SELECT * FROM quizzes WHERE id=?`,
      )
        .bind(id)
        .all();
      return c.json(asQuiz(results[0]));
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to update quiz" }, 500);
    }
  });

  // Create question
  app.post("/quizzes/:id/questions", async (c) => {
    try {
      const quizId = Number(c.req.param("id"));
      const { results: quizRows } = await env.DB.prepare(
        `SELECT * FROM quizzes WHERE id=?`,
      )
        .bind(quizId)
        .all();

      if (quizRows.length === 0) {
        return c.json({ error: "Quiz not found" }, 404);
      }

      const body = await c.req.json();
      const { type, prompt, options, correctAnswer, position } = body || {};
      if (!type || !prompt) {
        return c.json({ error: "type and prompt are required" }, 400);
      }
      if (!["mcq", "short", "code"].includes(type)) {
        return c.json({ error: "invalid type" }, 400);
      }

      let optionsJson = null;
      let finalCorrectAnswer = correctAnswer;
      if (type === "mcq") {
        if (!Array.isArray(options) || options.length < 2) {
          return c.json({ error: "mcq requires options (>=2)" }, 400);
        }
        optionsJson = JSON.stringify(options);
        if (finalCorrectAnswer === undefined || finalCorrectAnswer === null) {
          return c.json(
            { error: "mcq requires correctAnswer (index or text)" },
            400,
          );
        }
        if (typeof finalCorrectAnswer === "number") {
          finalCorrectAnswer = String(finalCorrectAnswer);
        }
      } else if (type === "short") {
        if (
          finalCorrectAnswer === undefined ||
          (typeof finalCorrectAnswer !== "string" &&
            finalCorrectAnswer !== null)
        ) {
          return c.json(
            { error: "short requires correctAnswer (string)" },
            400,
          );
        }
        finalCorrectAnswer = finalCorrectAnswer ?? "";
      }

      const { results: maxPosRows } = await env.DB.prepare(
        `SELECT COALESCE(MAX(position), -1) as m FROM questions WHERE quiz_id=?`,
      )
        .bind(quizId)
        .all();
      const maxPos = (maxPosRows[0]?.m as number) ?? -1;
      const pos =
        position !== undefined && position !== null
          ? Number(position)
          : maxPos + 1;

      const result = await env.DB.prepare(
        `INSERT INTO questions (quiz_id, type, prompt, options_json, correct_answer, position, created_at)
          VALUES (?,?,?,?,?,?,?)`,
      )
        .bind(
          quizId,
          type,
          prompt,
          optionsJson,
          finalCorrectAnswer ?? null,
          pos,
          nowISO(),
        )
        .run();

      const { results } = await env.DB.prepare(
        `SELECT * FROM questions WHERE id=?`,
      )
        .bind(result.meta.last_row_id)
        .all();
      return c.json(asQuestion(results[0]), 201);
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to create question" }, 500);
    }
  });

  // Update question
  app.patch("/questions/:id", async (c) => {
    try {
      const id = Number(c.req.param("id"));
      const { results: rows } = await env.DB.prepare(
        `SELECT * FROM questions WHERE id=?`,
      )
        .bind(id)
        .all();

      if (rows.length === 0) {
        return c.json({ error: "Question not found" }, 404);
      }

      const row0 = rows[0];
      const body = await c.req.json();
      const { type, prompt, options, correctAnswer, position } = body || {};

      if (type && !["mcq", "short", "code"].includes(type)) {
        return c.json({ error: "invalid type" }, 400);
      }

      let optionsJson = row0.options_json;
      if (options !== undefined) {
        if (options !== null && !Array.isArray(options)) {
          return c.json({ error: "options must be array or null" }, 400);
        }
        optionsJson = options ? JSON.stringify(options) : null;
      }

      await env.DB.prepare(
        `UPDATE questions
          SET type=COALESCE(?, type),
              prompt=COALESCE(?, prompt),
              options_json=?,
              correct_answer=COALESCE(?, correct_answer),
              position=COALESCE(?, position)
          WHERE id=?`,
      )
        .bind(
          type ?? null,
          prompt ?? null,
          optionsJson,
          correctAnswer === undefined ? null : correctAnswer,
          position === undefined ? null : Number(position),
          id,
        )
        .run();

      const { results } = await env.DB.prepare(
        `SELECT * FROM questions WHERE id=?`,
      )
        .bind(id)
        .all();
      return c.json(asQuestion(results[0]));
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to update question" }, 500);
    }
  });

  // Delete question
  app.delete("/questions/:id", async (c) => {
    try {
      const id = Number(c.req.param("id"));
      const result = await env.DB.prepare(`DELETE FROM questions WHERE id=?`)
        .bind(id)
        .run();

      if (result.meta.changes === 0) {
        return c.json({ error: "Question not found" }, 404);
      }
      return c.body(null, 204);
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to delete question" }, 500);
    }
  });

  // Start attempt
  app.post("/attempts", async (c) => {
    try {
      const body = await c.req.json();
      const { quizId } = body || {};
      if (!quizId) {
        return c.json({ error: "quizId required" }, 400);
      }

      const { results: quizRows } = await env.DB.prepare(
        `SELECT * FROM quizzes WHERE id=?`,
      )
        .bind(quizId)
        .all();

      if (quizRows.length === 0) {
        return c.json({ error: "Quiz not found" }, 404);
      }

      const quiz = quizRows[0];
      if (!quiz.is_published) {
        return c.json({ error: "Quiz is not published" }, 400);
      }

      const result = await env.DB.prepare(
        `INSERT INTO attempts (quiz_id, started_at) VALUES (?, datetime('now'))`,
      )
        .bind(quizId)
        .run();

      const attemptId = result.meta.last_row_id;

      const { results: qRows } = await env.DB.prepare(
        `SELECT * FROM questions WHERE quiz_id=? ORDER BY position ASC, id ASC`,
      )
        .bind(quizId)
        .all();

      const sanitized = qRows.map((r: any) => {
        const q = asQuestion(r);
        delete q.correctAnswer;
        return q;
      });

      return c.json(
        {
          id: attemptId,
          quizId,
          startedAt: nowISO(),
          submittedAt: null,
          answers: [],
          quiz: {
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            timeLimitSeconds: quiz.time_limit_seconds ?? undefined,
            questions: sanitized,
          },
        },
        201,
      );
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to start attempt" }, 500);
    }
  });

  // Upsert answer
  app.post("/attempts/:id/answer", async (c) => {
    try {
      const attemptId = Number(c.req.param("id"));
      const body = await c.req.json();
      const { questionId, value } = body || {};
      if (questionId === undefined || value === undefined || value === null) {
        return c.json({ error: "questionId and value required" }, 400);
      }

      const { results: attRows } = await env.DB.prepare(
        `SELECT * FROM attempts WHERE id=?`,
      )
        .bind(attemptId)
        .all();

      if (attRows.length === 0) {
        return c.json({ error: "Attempt not found" }, 404);
      }

      const att = attRows[0];
      if (att.submitted_at) {
        return c.json({ error: "Attempt already submitted" }, 400);
      }

      const { results: qRows } = await env.DB.prepare(
        `SELECT * FROM questions WHERE id=?`,
      )
        .bind(Number(questionId))
        .all();

      if (qRows.length === 0) {
        return c.json({ error: "Question not found" }, 404);
      }

      const q = qRows[0];
      if (q.quiz_id !== att.quiz_id) {
        return c.json(
          { error: "Question does not belong to this attempt's quiz" },
          400,
        );
      }

      await env.DB.prepare(
        `INSERT INTO attempt_answers (attempt_id, question_id, value) VALUES (?,?,?)
          ON CONFLICT(attempt_id, question_id) DO UPDATE SET value=excluded.value`,
      )
        .bind(attemptId, Number(questionId), String(value))
        .run();

      return c.json({ ok: true });
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to save answer" }, 500);
    }
  });

  // Submit attempt
  app.post("/attempts/:id/submit", async (c) => {
    try {
      const attemptId = Number(c.req.param("id"));

      const { results: attRows } = await env.DB.prepare(
        `SELECT * FROM attempts WHERE id=?`,
      )
        .bind(attemptId)
        .all();

      if (attRows.length === 0) {
        return c.json({ error: "Attempt not found" }, 404);
      }

      const att = attRows[0];
      if (att.submitted_at) {
        return c.json({ error: "Attempt already submitted" }, 400);
      }

      const { results: qRows } = await env.DB.prepare(
        `SELECT * FROM questions WHERE quiz_id=? ORDER BY position ASC, id ASC`,
      )
        .bind(att.quiz_id)
        .all();

      const { results: ansRows } = await env.DB.prepare(
        `SELECT * FROM attempt_answers WHERE attempt_id=?`,
      )
        .bind(attemptId)
        .all();

      const ansMap = new Map(ansRows.map((a: any) => [a.question_id, a.value]));
      let score = 0;
      const details = [];

      const norm = (s: string) =>
        String(s).trim().toLowerCase().replace(/\s+/g, " ");

      for (const r of qRows) {
        const q = asQuestion(r);
        const raw = ansMap.get(q.id);
        if (q.type === "mcq") {
          let correctIdx = -1;
          try {
            const numCorrectAnswer = Number(q.correctAnswer);
            if (!Number.isNaN(numCorrectAnswer)) {
              correctIdx = numCorrectAnswer;
            } else {
              correctIdx = q.options.findIndex(
                (opt: string) => norm(opt) === norm(q.correctAnswer as string),
              );
            }
          } catch (e) {
            correctIdx = -1;
          }

          const correctText =
            Array.isArray(q.options) &&
            Number.isInteger(correctIdx) &&
            correctIdx >= 0 &&
            q.options[correctIdx] !== undefined
              ? q.options[correctIdx]
              : undefined;

          let isCorrect = false;
          if (raw !== undefined) {
            if (!Number.isNaN(Number(raw))) {
              isCorrect = Number(raw) === correctIdx;
            } else if (correctText !== undefined) {
              isCorrect = norm(raw) === norm(correctText);
            }
          }
          if (isCorrect) score += 1;
          details.push({
            questionId: q.id,
            correct: isCorrect,
            expected: correctText,
          });
        } else if (q.type === "short") {
          const expected = q.correctAnswer ?? "";
          const normalizedExpected = norm(expected);
          const normalizedRaw = norm(raw ?? "");
          const isCorrect = normalizedRaw === normalizedExpected;
          if (isCorrect) score += 1;
          details.push({ questionId: q.id, correct: isCorrect, expected });
        } else {
          details.push({ questionId: q.id, correct: false });
        }
      }

      await env.DB.prepare(
        `UPDATE attempts SET submitted_at=datetime('now'), score=? WHERE id=?`,
      )
        .bind(score, attemptId)
        .run();

      return c.json({ score, details });
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to submit attempt" }, 500);
    }
  });

  // Track anti-cheat events
  app.post("/attempts/:id/events", async (c) => {
    try {
      const attemptId = Number(c.req.param("id"));
      const body = await c.req.json();
      const { event } = body || {};
      if (!event || typeof event !== "string") {
        return c.json({ error: "event is required and must be a string" }, 400);
      }

      const { results: attRows } = await env.DB.prepare(
        `SELECT * FROM attempts WHERE id=?`,
      )
        .bind(attemptId)
        .all();

      if (attRows.length === 0) {
        return c.json({ error: "Attempt not found" }, 404);
      }

      const att = attRows[0];
      if (att.submitted_at) {
        return c.json({ error: "Attempt already submitted" }, 400);
      }

      await env.DB.prepare(
        `INSERT INTO attempt_events (attempt_id, event) VALUES (?, ?)`,
      )
        .bind(attemptId, event)
        .run();

      return c.json({ ok: true }, 201);
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to track event" }, 500);
    }
  });

  // 404
  app.notFound((c) => {
    return c.json({ error: "Not found" }, 404);
  });

  return app;
}
