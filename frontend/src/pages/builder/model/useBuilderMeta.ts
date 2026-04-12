import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { builderMetaSchema, useCreateQuiz } from '@/entities/quiz'
import type { BuilderMetaFormData } from '@/entities/quiz'

export function useBuilderMeta() {
  const navigate = useNavigate()
  const createQuiz = useCreateQuiz()

  const form = useForm<BuilderMetaFormData>({
    resolver: zodResolver(builderMetaSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = async (data: BuilderMetaFormData) => {
    const result = await createQuiz.mutateAsync(data)
    navigate({
      to: '/build_quiz/$quizId',
      params: { quizId: String(result.id) },
    })
  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(onSubmit),
    },
    createQuiz,
  }
}
