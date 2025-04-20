import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/passwordForgot')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/auth/passwordForgot"!</div>;
}
