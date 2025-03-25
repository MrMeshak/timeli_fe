import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <div className="m-3 p-5 font-bold text-cyan-400">Hello Worl!</div>;
}
