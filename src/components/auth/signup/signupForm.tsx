import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/services/authService';
import { AxiosError } from 'axios';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from '@tanstack/react-router';

const signupFormSchema = z.object({
  firstName: z.string().min(1, 'Required').max(50),
  lastName: z.string().min(1, 'Required').max(50),
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Required')
    .min(8, 'At least 8 characters')
    .max(127)
    .refine(
      (password) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/.test(password),
      (password) => {
        const strArr: string[] = ['Requires'];
        if (!/(?=.*\d)/.test(password)) {
          strArr.push(' • number');
        }
        if (!/(?=.*[a-z])/.test(password)) {
          strArr.push(' • lowercase');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
          strArr.push(' • uppercase');
        }
        if (!/(?=.*[\W])/.test(password)) {
          strArr.push(' • symbol');
        }
        return { message: strArr.join('') };
      },
    ),
});

type SignupFormSchema = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => navigate({ to: '/auth/signupSuccess' }),
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setError('root', { message: error.response?.data.message });
          return;
        }
        setError('root', { message: 'Oops, something went wrong' });
      }
    },
  });

  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: SignupFormSchema) => {
    signupMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-w-80 flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />

        <div className="mt-4 flex flex-col gap-4">
          <Button>Sign Up</Button>
          {errors.root && (
            <Alert className="bg-tmaroon-muted border-tmaroon-border">
              <AlertDescription className="text-tmaroon-muted-foreground">
                {errors.root.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  );
}
