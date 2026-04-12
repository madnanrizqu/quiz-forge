import { useCallback, useReducer } from 'react'
import type { QuizChoice, QuizQuestion } from '@/entities/quiz'
import { QuestionType } from '@/entities/quiz'
import { generateId, getQuestionInitialState } from './questionDefaults'

interface QuestionEditorState {
  type: QuestionType
  prompt: string
  code: string | undefined
  choices: QuizChoice[]
  correctAnswerId: string
  shortAnswer: string
}

type QuestionEditorAction =
  | { type: 'SET_TYPE'; payload: QuestionType }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'SET_CODE'; payload: string | undefined }
  | { type: 'SET_CHOICE_TEXT'; payload: { choiceId: string; text: string } }
  | { type: 'SET_CORRECT_ANSWER'; payload: string }
  | { type: 'ADD_CHOICE' }
  | { type: 'DELETE_CHOICE'; payload: string }
  | { type: 'SET_SHORT_ANSWER'; payload: string }

function reducer(
  state: QuestionEditorState,
  action: QuestionEditorAction,
): QuestionEditorState {
  switch (action.type) {
    case 'SET_TYPE': {
      const newType = action.payload
      if (newType === QuestionType.ShortAnswer) {
        const correctChoice = state.choices.find(
          (c) => c.id === state.correctAnswerId,
        )
        return {
          ...state,
          type: newType,
          shortAnswer: correctChoice?.text ?? '',
        }
      }
      return { ...state, type: newType }
    }
    case 'SET_PROMPT':
      return { ...state, prompt: action.payload }
    case 'SET_CODE':
      return { ...state, code: action.payload }
    case 'SET_CHOICE_TEXT':
      return {
        ...state,
        choices: state.choices.map((c) =>
          c.id === action.payload.choiceId
            ? { ...c, text: action.payload.text }
            : c,
        ),
      }
    case 'SET_CORRECT_ANSWER':
      return { ...state, correctAnswerId: action.payload }
    case 'ADD_CHOICE':
      return {
        ...state,
        choices: [
          ...state.choices,
          { id: generateId(), text: '', isCorrect: false },
        ],
      }
    case 'DELETE_CHOICE': {
      const choiceId = action.payload
      const filtered = state.choices.filter((c) => c.id !== choiceId)
      if (filtered.length === 0) {
        return {
          ...state,
          choices: [{ id: generateId(), text: '', isCorrect: true }],
          correctAnswerId: generateId(),
        }
      }
      const newCorrectAnswerId =
        choiceId === state.correctAnswerId && filtered.length > 0
          ? filtered[0].id
          : state.correctAnswerId
      return {
        ...state,
        choices: filtered,
        correctAnswerId: newCorrectAnswerId,
      }
    }
    case 'SET_SHORT_ANSWER':
      return { ...state, shortAnswer: action.payload }
    default:
      return state
  }
}

function buildQuestion(
  state: QuestionEditorState,
  defaultId?: string,
): QuizQuestion {
  return {
    id: defaultId ?? generateId(),
    type: state.type,
    prompt: state.prompt,
    code: typeof state.code === 'string' ? state.code : undefined,
    ...(state.type === QuestionType.MultipleChoice
      ? { choices: state.choices }
      : { correctAnswer: state.shortAnswer }),
  }
}

export function useQuestionEditor(
  defaultValue?: QuizQuestion,
  onUpdate?: (question: QuizQuestion) => void,
) {
  const initialState: QuestionEditorState =
    getQuestionInitialState(defaultValue)

  const [state, baseDispatch] = useReducer(reducer, initialState)

  const dispatch = useCallback(
    (action: QuestionEditorAction) => {
      const newState = reducer(state, action)
      baseDispatch(action)
      onUpdate?.(buildQuestion(newState, defaultValue?.id))
    },
    [state, onUpdate, defaultValue?.id],
  )

  const handleTypeChange = useCallback(
    (newType: QuestionType) => {
      dispatch({ type: 'SET_TYPE', payload: newType })
    },
    [dispatch],
  )

  const handlePromptChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_PROMPT', payload: value })
    },
    [dispatch],
  )

  const handleCodeChange = useCallback(
    (value: string | undefined) => {
      dispatch({ type: 'SET_CODE', payload: value })
    },
    [dispatch],
  )

  const handleChoiceChange = useCallback(
    (choiceId: string, text: string) => {
      dispatch({ type: 'SET_CHOICE_TEXT', payload: { choiceId, text } })
    },
    [dispatch],
  )

  const handleCorrectAnswerChange = useCallback(
    (choiceId: string) => {
      dispatch({ type: 'SET_CORRECT_ANSWER', payload: choiceId })
    },
    [dispatch],
  )

  const handleAddChoice = useCallback(() => {
    dispatch({ type: 'ADD_CHOICE' })
  }, [dispatch])

  const handleDeleteChoice = useCallback(
    (choiceId: string) => {
      dispatch({ type: 'DELETE_CHOICE', payload: choiceId })
    },
    [dispatch],
  )

  const handleShortAnswerChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_SHORT_ANSWER', payload: value })
    },
    [dispatch],
  )

  return {
    type: state.type,
    prompt: state.prompt,
    code: state.code,
    choices: state.choices,
    correctAnswerId: state.correctAnswerId,
    shortAnswer: state.shortAnswer,
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
