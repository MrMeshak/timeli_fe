import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/home/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>!</div>;
}
