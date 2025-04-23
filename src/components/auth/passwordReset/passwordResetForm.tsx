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
import { Alert, AlertDescription } from '@/components/ui/alert';

const passwordResetFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Required')
      .min(8, 'At least 8 characters')
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
    passwordConfirm: z.string().min(1, 'Required'),
  })
  .refine((fields) => fields.password === fields.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords did not match',
  });

type PasswordResetFormSchema = z.infer<typeof passwordResetFormSchema>;

export default function PasswordResetForm() {
  const form = useForm({
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: PasswordResetFormSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-w-80 flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex flex-col gap-4">
          <Button>Reset</Button>
          {errors.root && (
            <Alert className="bg-muted">
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  );
}
