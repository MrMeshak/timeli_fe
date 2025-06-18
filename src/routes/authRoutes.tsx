import z from 'zod';
import { createRoute, notFound } from '@tanstack/react-router';
import { rootRoute } from '@/routes/routes';
import LoginPage from '@/app/auth/loginPage';
import SignupPage from '@/app/auth/signupPage';
import PasswordResetPage from '@/app/auth/passwordResetPage';
import PasswordResetSuccessPage from '@/app/auth/passwordResetSuccessPage';
import PasswordForgotPage from '@/app/auth/passwordForgotPage';
import PasswordForgotSuccessPage from '@/app/auth/passwordForgotSucessPage';
import SignupSuccessPage from '@/app/auth/signupSuccessPage';

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'login',
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'signup',
  component: SignupPage,
});

const signupSuccessRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'signupSuccess',
  component: SignupSuccessPage,
});

const passwordResetSearchSchema = z.object({
  token: z.string().jwt().catch(''),
});

export const passwordResetRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordReset',
  validateSearch: passwordResetSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps: search }) => {
    if (!search.token) {
      throw notFound();
    }
    return {
      search: {
        token: search.token,
      },
    };
  },
  component: PasswordResetPage,
});

const passwordResetSuccessRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordResetSuccess',
  component: PasswordResetSuccessPage,
});

const passwordForgotRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordForgot',
  component: PasswordForgotPage,
});

const passwordForgotSuccessRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'passwordForgotSuccess',
  component: PasswordForgotSuccessPage,
});

export const authRouteTree = authRoute.addChildren([
  loginRoute,
  signupRoute,
  signupSuccessRoute,
  passwordResetRoute,
  passwordResetSuccessRoute,
  passwordForgotRoute,
  passwordForgotSuccessRoute,
]);
