import { getCountries } from '@/app/lib/data';

import PasswordReset from '@/app/components/PasswordReset';
export default async function page({}) {
  const countries = await getCountries();
  return <PasswordReset countries={countries} />;
}
