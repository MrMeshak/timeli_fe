import LoginCard from '@/components/auth/login/loginCard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginCard />
    </div>
  );
}
