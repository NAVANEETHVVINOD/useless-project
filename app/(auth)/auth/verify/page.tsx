import { Suspense } from 'react';
import { EmailVerification } from '@/components/auth/email-verification';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerification />
    </Suspense>
  );
}
