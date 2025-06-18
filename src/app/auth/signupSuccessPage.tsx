import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import SignupSuccessCard from '@/components/auth/signup/signupSuccessCard';

export default function SignupSuccessPage() {
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
