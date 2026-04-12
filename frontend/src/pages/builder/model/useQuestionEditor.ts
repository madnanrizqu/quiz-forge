import { useCallback, useState } from 'react'
import type { QuizChoice, QuizQuestion } from '@/entities/quiz'
import { QuestionType } from '@/entities/quiz'
import { generateId, getQuestionInitialState } from './questionDefaults'

export function useQuestionEditor(
  defaultValue?: QuizQuestion,
  onUpdate?: (question: QuizQuestion) => void,
) {
  const {
    type: initialType,
    prompt: initialPrompt,
    code: initialCode,
    choices: initialChoices,
    correctAnswerId: initialCorrectAnswerId,
    shortAnswer: initialShortAnswer,
  } = getQuestionInitialState(defaultValue)

  const [type, setType] = useState(initialType)
  const [prompt, setPrompt] = useState(initialPrompt)
  const [code, setCode] = useState(initialCode)
  const [choices, setChoices] = useState<QuizChoice[]>(initialChoices)
  const [correctAnswerId, setCorrectAnswerId] = useState(initialCorrectAnswerId)
  const [shortAnswer, setShortAnswer] = useState(initialShortAnswer)

  const emitUpdate = useCallback(() => {
    if (!onUpdate) return
    const question: QuizQuestion = {
      id: defaultValue?.id ?? generateId(),
      type,
      prompt,
      code: code || undefined,
      ...(type === QuestionType.MultipleChoice
        ? { choices }
        : { correctAnswer: shortAnswer }),
    }
    onUpdate(question)
  }, [type, prompt, code, choices, shortAnswer, onUpdate, defaultValue?.id])

  const handleTypeChange = useCallback(
    (newType: QuestionType) => {
      setType(newType)
      if (newType === QuestionType.ShortAnswer) {
        const correctChoice = choices.find((c) => c.id === correctAnswerId)
        setShortAnswer(correctChoice?.text ?? '')
      }
      emitUpdate()
    },
    [choices, correctAnswerId, emitUpdate],
  )

  const handlePromptChange = useCallback(
    (value: string) => {
      setPrompt(value)
      emitUpdate()
    },
    [emitUpdate],
  )

  const handleCodeChange = useCallback(
    (value: string) => {
      setCode(value)
      emitUpdate()
    },
    [emitUpdate],
  )

  const handleChoiceChange = useCallback(
    (choiceId: string, text: string) => {
      setChoices((prev) =>
        prev.map((c) => (c.id === choiceId ? { ...c, text } : c)),
      )
      emitUpdate()
    },
    [emitUpdate],
  )

  const handleCorrectAnswerChange = useCallback(
    (choiceId: string) => {
      setCorrectAnswerId(choiceId)
      emitUpdate()
    },
    [emitUpdate],
  )

  const handleAddChoice = useCallback(() => {
    setChoices((prev) => [
      ...prev,
      { id: generateId(), text: '', isCorrect: false },
    ])
  }, [])

  const handleDeleteChoice = useCallback(
    (choiceId: string) => {
      setChoices((prev) => {
        const filtered = prev.filter((c) => c.id !== choiceId)
        if (filtered.length === 0) {
          return [{ id: generateId(), text: '', isCorrect: true }]
        }
        if (choiceId === correctAnswerId && filtered.length > 0) {
          setCorrectAnswerId(filtered[0].id)
        }
        return filtered
      })
      emitUpdate()
    },
    [correctAnswerId, emitUpdate],
  )

  const handleShortAnswerChange = useCallback(
    (value: string) => {
      setShortAnswer(value)
      emitUpdate()
    },
    [emitUpdate],
  )

  return {
    type,
    prompt,
    code,
    choices,
    correctAnswerId,
    shortAnswer,
    handlers: {
      handleTypeChange,
      handlePromptChange,
      handleCodeChange,
      handleChoiceChange,
      handleCorrectAnswerChange,
      handleAddChoice,
      handleDeleteChoice,
      handleShortAnswerChange,
    },
  }
}
