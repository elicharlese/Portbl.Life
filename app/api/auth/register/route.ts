import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createUserSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, createErrorResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function handler(req: NextRequest) {
  const body = await req.json();
  const userData = createUserSchema.parse(body);

  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      },
    },
  });

  if (error) {
    return createErrorResponse(error.message, 400);
  }

  return createResponse({
    user: data.user,
    session: data.session,
    message: 'Please check your email to verify your account',
  }, 201);
}

export const POST = withErrorHandling(withMethods(['POST'])(handler));
