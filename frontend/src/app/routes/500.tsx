import { createFileRoute } from '@tanstack/react-router'
import { ErrorPage } from '@/pages/error'

export const Route = createFileRoute('/500')({
  component: ErrorPage,
})
