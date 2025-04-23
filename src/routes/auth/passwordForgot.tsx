import { createFileRoute } from '@tanstack/react-router';

import PasswordForgotCard from '@/components/auth/passwordForgot/passwordForgotCard';

export const Route = createFileRoute('/auth/passwordForgot')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PasswordForgotCard />
    </div>
  );
}
