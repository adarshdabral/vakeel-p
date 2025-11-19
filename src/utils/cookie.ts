import { cookies } from 'next/headers';

export function setCookie(name: string, value: string) {
  cookies().set(name, value);
}

export function getCookie(name: string) {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value ?? null;
}
