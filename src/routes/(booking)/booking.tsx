import { createFileRoute } from '@tanstack/react-router';
import AppLayout from '@/components/layout/appLayout';

export const Route = createFileRoute('/(booking)/booking')({
  component: AppLayout,
});
