import { useEffect } from "react";
import { useRouter } from 'next/router';

export default function logout() {
  const router = useRouter();

  useEffect(() => {
    window.localStorage.removeItem('_session');
    window.location.href = '/';
  }, []);

  return <h1>Loading...</h1>
}