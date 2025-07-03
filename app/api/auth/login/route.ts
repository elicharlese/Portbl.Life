import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { loginSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, createErrorResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function handler(req: NextRequest) {
  const body = await req.json();
  const { email, password } = loginSchema.parse(body);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return createErrorResponse(error.message, 401);
  }

  return createResponse({
    user: data.user,
    session: data.session,
  });
}

export const POST = withErrorHandling(withMethods(['POST'])(handler));
