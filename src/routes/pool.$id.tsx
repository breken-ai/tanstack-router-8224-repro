import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pool/$id')({
  component: () => <p>pool detail</p>,
})
