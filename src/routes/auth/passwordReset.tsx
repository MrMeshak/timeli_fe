import { createFileRoute } from '@tanstack/react-router';

import PasswordResetCard from '@/components/auth/passwordReset/passwordResetCard';

export const Route = createFileRoute('/auth/passwordReset')({
  component: PasswordResetPage,
});

function PasswordResetPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PasswordResetCard />
    </div>
  );
}
