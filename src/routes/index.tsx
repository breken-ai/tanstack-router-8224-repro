import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../components/Dashboard'

export const Route = createFileRoute('/')({
  component: () => (
    <main>
      <h1>index route</h1>
      <Dashboard />
    </main>
  ),
})
