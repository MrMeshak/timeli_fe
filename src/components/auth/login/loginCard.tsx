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
        <p className="text-muted-foreground text-sm">
          Don't have an account?{' '}
          <Link
            className="text-primary font-semibold hover:underline"
            to="/auth/signup"
          >
            Signup
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
