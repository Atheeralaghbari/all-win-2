import SignUp from '@/app/components/SignUp';
import { getCountries } from '@/app/lib/data';
export default async function page({ searchParams }) {
  const { type } = await searchParams;
  const countries = await getCountries();
  console.log(type, countries);
  return (
    <SignUp
      userType={type}
      countries={countries}
    />
  );
}
