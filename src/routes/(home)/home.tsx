import { createFileRoute } from '@tanstack/react-router';
import AppLayout from '@/components/layout/appLayout';

export const Route = createFileRoute('/(home)/home')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return <AppLayout />;
}
