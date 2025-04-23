import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/passwordForgotSuccess')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/passwordForgotSuccess"!</div>
}
