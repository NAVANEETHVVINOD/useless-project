"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function EmailVerification() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email) {
      setError('No email address provided.');
      return;
    }

    setIsSending(true);
    setError(null);
    setIsSent(false);

    try {
      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify`,
        },
      });

      if (resendError) {
        setError(resendError.message);
      } else {
        setIsSent(true);
      }
    } catch {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-md">
        <MailCheck className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          Verify your email address
        </h1>
        <p className="text-gray-600 mt-2">
          We've sent a verification link to <strong>{email || 'your email address'}</strong>. Please check your inbox and click the link to activate your account.
        </p>
        <div className="mt-6">
          <Button onClick={handleResend} disabled={isSending}>
            {isSending ? 'Sending...' : 'Resend verification email'}
          </Button>
        </div>
        {isSent && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <AlertTitle>Email Sent</AlertTitle>
            <AlertDescription>
              A new verification link has been sent to your email address.
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert className="mt-4" variant="destructive">
             <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <p className="text-sm text-gray-500 mt-6">
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  );
}
