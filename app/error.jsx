'use client'
 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Error({ error, reset }) {
  const router = useRouter()
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, secondsRemaining * 1000);

    const interval = setInterval(() => {
      setSecondsRemaining(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [error, router, secondsRemaining]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Redirecting to home page in {secondsRemaining} seconds...</p>
    </div>
  )
}