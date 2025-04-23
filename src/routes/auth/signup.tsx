import { createFileRoute } from '@tanstack/react-router';

import SignupCard from '@/components/auth/signup/signupCard';

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignupCard />
    </div>
  );
}
