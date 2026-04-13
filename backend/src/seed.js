const { db, migrate } = require("./db");

function main() {
  migrate();

  db.exec(
    `DELETE FROM attempt_answers; DELETE FROM attempts; DELETE FROM questions; DELETE FROM quizzes;`,
  );

  const insertQuiz = db.prepare(
    `INSERT INTO quizzes (title, description, time_limit_seconds, is_published) VALUES (?,?,?,?)`,
  );
  const insertQ = db.prepare(`
    INSERT INTO questions (quiz_id, type, prompt, options_json, correct_answer, position)
    VALUES (?,?,?,?,?,?)
  `);

  const quiz1 = insertQuiz.run(
    "JavaScript Fundamentals",
    "Test your knowledge of core JavaScript concepts including closures, prototypes, and language mechanics.",
    600,
    1,
  );
  const q1Id = quiz1.lastInsertRowid;

  insertQ.run(
    q1Id,
    "mcq",
    "What does a closure give you access to in JavaScript?",
    JSON.stringify([
      "Only the function's local variables",
      "The function's local variables and parameters",
      "The function's local variables, parameters, and outer scope variables",
    ]),
    "2",
    0,
  );
  insertQ.run(
    q1Id,
    "mcq",
    "Which method removes the last element from an array and returns it?",
    JSON.stringify(["shift()", "pop()", "push()", "slice()"]),
    "1",
    1,
  );
  insertQ.run(
    q1Id,
    "mcq",
    "What is the output of: console.log(typeof null)?",
    JSON.stringify(['"null"', '"undefined"', '"object"', '"boolean"']),
    "2",
    2,
  );
  insertQ.run(
    q1Id,
    "short",
    "What JavaScript keyword is used to create a block-scoped variable that cannot be reassigned?",
    null,
    "const",
    3,
  );
  insertQ.run(
    q1Id,
    "short",
    "What method converts a JSON string back into a JavaScript object?",
    null,
    "JSON.parse",
    4,
  );
  const quiz2 = insertQuiz.run(
    "Async JavaScript & Promises",
    "Master asynchronous programming in JavaScript including callbacks, promises, and async/await patterns.",
    450,
    1,
  );
  const q2Id = quiz2.lastInsertRowid;

  insertQ.run(
    q2Id,
    "mcq",
    "What are the three states of a Promise?",
    JSON.stringify([
      "pending, resolved, rejected",
      "waiting, success, failure",
      "loading, done, error",
      "active, complete, aborted",
    ]),
    "0",
    0,
  );
  insertQ.run(
    q2Id,
    "mcq",
    "Which method chains onto a Promise to handle a rejected case?",
    JSON.stringify([".then()", ".catch()", ".finally()", ".error()"]),
    "1",
    1,
  );
  insertQ.run(
    q2Id,
    "short",
    "What JavaScript keyword pauses execution inside an async function until a Promise resolves?",
    null,
    "await",
    2,
  );
  insertQ.run(
    q2Id,
    "short",
    "What Promise method takes an array of promises and returns a new promise that resolves when all input promises have resolved (or one rejects)?",
    null,
    "Promise.all",
    3,
  );
  const quiz3 = insertQuiz.run(
    "HTML & CSS Essentials",
    "Test your understanding of web structure, styling, and layout techniques.",
    480,
    1,
  );
  const q3Id = quiz3.lastInsertRowid;

  insertQ.run(
    q3Id,
    "mcq",
    "Which CSS property controls the space between an element's border and its content?",
    JSON.stringify(["margin", "padding", "border-spacing", "gap"]),
    "1",
    0,
  );
  insertQ.run(
    q3Id,
    "mcq",
    "In the CSS Box Model, which layer is outermost?",
    JSON.stringify(["content", "padding", "border", "margin"]),
    "3",
    1,
  );
  insertQ.run(
    q3Id,
    "mcq",
    "Which HTML element is used to define the main content of a document (semantically)?",
    JSON.stringify(["<div>", "<main>", "<section>", "<body>"]),
    "1",
    2,
  );
  insertQ.run(
    q3Id,
    "short",
    "What CSS display value makes an element a flex container?",
    null,
    "flex",
    3,
  );
  insertQ.run(
    q3Id,
    "short",
    "What CSS property specifies the stacking order of positioned elements?",
    null,
    "z-index",
    4,
  );

  const quiz4 = insertQuiz.run(
    "Node.js Fundamentals",
    "Learn the core concepts of Node.js including modules, streams, and the event loop.",
    600,
    1,
  );
  const q4Id = quiz4.lastInsertRowid;

  insertQ.run(q4Id, "mcq", "What is the purpose of the package.json file?", JSON.stringify(["To define the project's metadata only", "To list dependencies and scripts", "To configure the Node.js runtime", "To store environment variables"]), "1", 0);
  insertQ.run(q4Id, "mcq", "Which of the following is NOT a built-in Node.js module?", JSON.stringify(["fs", "http", "express", "path"]), "2", 1);
  insertQ.run(q4Id, "mcq", "What does the __dirname variable represent?", JSON.stringify(["The user's home directory", "The current working directory when Node was launched", "The directory of the currently executing script", "A temporary system directory"]), "2", 2);
  insertQ.run(q4Id, "mcq", "How do you import the 'fs' module in Node.js?", JSON.stringify(["import fs from 'fs'", "require('fs')", "using fs;", "include fs"]), "1", 3);
  insertQ.run(q4Id, "mcq", "What is the difference between process.nextTick() and setImmediate()?", JSON.stringify(["They are identical", "nextTick fires before I/O callbacks, setImmediate fires after I/O callbacks", "setImmediate is faster", "nextTick is only for browsers"]), "1", 4);
  insertQ.run(q4Id, "mcq", "Which method is used to read the entire contents of a file synchronously?", JSON.stringify(["fs.readFile()", "fs.readFileSync()", "fs.read()", "fs.readAsync()"]), "1", 5);
  insertQ.run(q4Id, "mcq", "What does the EventEmitter class provide?", JSON.stringify(["File system operations", "HTTP server creation", "A pattern for publishing and subscribing to events", "Database connectivity"]), "2", 6);
  insertQ.run(q4Id, "short", "What Node.js module is used to create a web server?", null, "http", 7);
  insertQ.run(q4Id, "short", "What global object provides information about the current Node.js process?", null, "process", 8);
  insertQ.run(q4Id, "short", "What command installs a package as a development dependency?", null, "npm install --save-dev", 9);
  insertQ.run(q4Id, "short", "What property of the process object contains the command-line arguments?", null, "argv", 10);
  insertQ.run(q4Id, "short", "Which module provides utilities for working with file and directory paths?", null, "path", 11);
  insertQ.run(q4Id, "short", "What method is used to exit a Node.js process with a success code?", null, "process.exit(0)", 12);
  insertQ.run(q4Id, "short", "What does the module.exports object represent?", null, "The exports of the current module", 13);
  insertQ.run(q4Id, "short", "What built-in Node.js module is used for operating system information?", null, "os", 14);

  console.log("Seeded 4 quizzes with quality questions.");
  console.log(`  - JavaScript Fundamentals: 5 questions`);
  console.log(`  - Async JavaScript & Promises: 4 questions`);
  console.log(`  - HTML & CSS Essentials: 5 questions`);
  console.log(`  - Node.js Fundamentals: 15 questions`);
}

main();
