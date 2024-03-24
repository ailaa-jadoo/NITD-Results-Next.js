'use client' // Error components must be Client Components
 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// export default function Error({ error, reset }) {
//   const router = useRouter()

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       router.push("/");
//     }, 10000);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div>
//       <h2>Something went wrong!</h2>
//     </div>
//   )
// }

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
  }, []);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Redirecting to home page in {secondsRemaining} seconds...</p>
    </div>
  )
}