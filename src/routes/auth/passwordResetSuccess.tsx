import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/passwordResetSuccess')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/passwordResetSuccess"!</div>
}
