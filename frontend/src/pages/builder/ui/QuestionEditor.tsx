import { Button, Icon } from '@/shared/ui'
import type { QuizQuestion } from '@/entities/quiz'
import {
  BuilderAnswerSection,
  BuilderQuestionHeader,
  BuilderQuestionPrompt,
  CodeSnippetInput,
  QuestionCard,
} from '@/entities/quiz'
import { useQuestionEditor } from '@/pages/builder/model/useQuestionEditor'

export interface QuestionEditorProps {
  defaultValue?: QuizQuestion
  onUpdate?: (question: QuizQuestion) => void
  onDelete?: () => void
  questionCount?: number
  questionNumber?: number
}

export function QuestionEditor({
  defaultValue,
  onUpdate,
  onDelete,
  questionCount,
  questionNumber,
}: QuestionEditorProps) {
  const {
    type,
    prompt,
    code,
    choices,
    correctAnswerId,
    shortAnswer,
    handlers,
  } = useQuestionEditor(defaultValue, onUpdate)

  return (
    <QuestionCard className="group relative">
      {(questionCount === undefined || questionCount > 1) && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="icon"
            size="icon"
            onClick={onDelete}
            aria-label="Delete question"
            className="text-outline hover:text-error transition-colors opacity-0 group-hover:opacity-100"
          >
            <Icon name="mi:delete" />
          </Button>
        </div>
      )}

      <BuilderQuestionHeader
        questionNumber={questionNumber ?? 1}
        type={type}
        onTypeChange={handlers.handleTypeChange}
      />

      <div className="space-y-10">
        <div className="space-y-6">
          <BuilderQuestionPrompt
            value={prompt}
            onChange={handlers.handlePromptChange}
            defaultValue={prompt}
          />

          <CodeSnippetInput
            value={code}
            onChange={handlers.handleCodeChange}
            defaultValue={code}
          />
        </div>

        <BuilderAnswerSection
          questionType={type}
          choices={choices}
          correctAnswerId={correctAnswerId}
          shortAnswerValue={shortAnswer}
          name={defaultValue ? `correct_answer_${defaultValue.id}` : 'correct_answer'}
          onChoiceChange={handlers.handleChoiceChange}
          onCorrectAnswerChange={handlers.handleCorrectAnswerChange}
          onAddChoice={handlers.handleAddChoice}
          onDeleteChoice={handlers.handleDeleteChoice}
          onShortAnswerChange={handlers.handleShortAnswerChange}
        />
      </div>
    </QuestionCard>
  )
}
