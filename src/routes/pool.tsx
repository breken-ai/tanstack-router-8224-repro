import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../components/Dashboard'

export const Route = createFileRoute('/pool')({
  component: () => (
    <main>
      <h1>pool layout</h1>
      <Dashboard />
      <Outlet />
    </main>
  ),
})
