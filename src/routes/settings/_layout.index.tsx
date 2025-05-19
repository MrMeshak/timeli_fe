import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/settings"!</div>;
}
