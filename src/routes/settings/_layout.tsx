import { createFileRoute } from '@tanstack/react-router';
import AppLayout from '@/components/layout/appLayout';

export const Route = createFileRoute('/settings/_layout')({
  component: AppLayout,
});
