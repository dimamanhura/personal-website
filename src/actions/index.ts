'use server';

import * as auth from '@/auth';

export const signIn = () => {
  return auth.signIn('github');
};

export const signOut = () => {
  return auth.signOut();
};
