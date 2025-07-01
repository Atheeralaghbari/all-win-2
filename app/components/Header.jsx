import React from 'react';

import { cookies } from 'next/headers';
import HeaderClient from '@/app/components/HeaderClient';
export default async function Header() {
  const cookie = await cookies();
  const sessionToken = cookie.get('session_info');
  const isLoggedIn = !!sessionToken;
  // console.log(isLoggedIn);
  return <HeaderClient isLoggedIn={isLoggedIn} />;
}
