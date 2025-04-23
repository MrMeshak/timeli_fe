import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import SignupSuccessCard from '@/components/auth/signup/signupSuccessCard';

export const Route = createFileRoute('/auth/signupSuccess')({
  component: SignupSuccessPage,
});

function SignupSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate({ to: '/auth/login' });
    }, 2000);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignupSuccessCard />
    </div>
  );
}
