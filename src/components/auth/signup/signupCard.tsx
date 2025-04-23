import { Link } from '@tanstack/react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignupForm from './signupForm';

export default function SignupCard() {
  return (
    <Card className="m-4 flex h-fit w-full max-w-96 flex-col justify-between">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-primary font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
