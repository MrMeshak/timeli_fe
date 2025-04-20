import { Link } from '@tanstack/react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import LoginForm from './loginForm';

export default function LoginCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login with your email. </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Don't have an account?{' '}
          <Link
            className="font-semibold text-black hover:underline dark:text-white"
            to="/auth/signup"
          >
            Signup
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
