import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resetPasswordSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, createErrorResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';
import { config } from '@/lib/config';

async function handler(req: NextRequest) {
  const body = await req.json();
  const { email } = resetPasswordSchema.parse(body);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${config.app.url}/auth/reset-password`,
  });

  if (error) {
    return createErrorResponse(error.message, 400);
  }

  return createResponse({
    message: 'Password reset email sent. Please check your inbox.',
  });
}

export const POST = withErrorHandling(withMethods(['POST'])(handler));
