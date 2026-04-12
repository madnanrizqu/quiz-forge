import { z } from 'zod'

export const createQuizSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  timeLimitSeconds: z.union([z.string(), z.number()]).optional(),
  isPublished: z.boolean().optional(),
})

export const updateQuizSchema = createQuizSchema.partial()

export const createQuestionSchema = z.object({
  type: z.enum(['mcq', 'short', 'code']),
  prompt: z.string().min(1),
  options: z.string().optional(),
  correctAnswer: z.string().or(z.number()).optional(),
  position: z.number().optional(),
})

export const updateQuestionSchema = createQuestionSchema.partial()

export const startAttemptSchema = z.object({
  quizId: z.number(),
})

export const answerSchema = z.object({
  questionId: z.number(),
  value: z.union([z.string(), z.number()]),
})
