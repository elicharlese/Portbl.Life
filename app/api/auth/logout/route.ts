import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { withErrorHandling, createResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function handler(req: NextRequest) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return createResponse({ message: 'Logout successful' }); // Still return success even if error
  }

  return createResponse({ message: 'Logout successful' });
}

export const POST = withErrorHandling(withMethods(['POST'])(handler));
