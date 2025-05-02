import { Navbar } from '@/components/nav/navbar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
