import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return <div className="m-3 p-5 font-bold">Hello Worl!</div>;
}
