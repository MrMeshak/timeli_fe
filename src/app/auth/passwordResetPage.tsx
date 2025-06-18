import { z } from 'zod';
import { createFileRoute, notFound } from '@tanstack/react-router';

import PasswordResetCard from '@/components/auth/passwordReset/passwordResetCard';

const passwordResetParamsSchema = z.object({
  token: z.string().jwt().optional().catch(undefined),
});

// export const Route = createFileRoute('/auth/passwordReset')({
//   component: PasswordResetPage,
//   validateSearch: passwordResetParamsSchema,
//   loaderDeps: ({ search }) => search,
//   loader: ({ deps: search }) => {
//     if (!search.token) {
//       throw notFound();
//     }
//     return search.token;
//   },
// });

export default function PasswordResetPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PasswordResetCard />
    </div>
  );
}
