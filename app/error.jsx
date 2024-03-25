'use client'
 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {Card, CardFooter, CardBody, Image, CardHeader, Divider, Button, Code} from "@nextui-org/react";
import skelly from '../public/skeleton-svgrepo-com.png'

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
    <div className='flex justify-center items-center h-screen px-2'>
      <Card isFooterBlurred
      radius="lg" className="max-w-[400px] md:max-w-2xl border-none">
      <CardHeader className="flex gap-3">
        <Image
          alt="skelly logo"
          height={40}
          radius="sm"
          src="https://i.ibb.co/Q7gjd3N/skeleton-svgrepo-com.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-lg text-danger font-bold">Error</p>
          <p className="text-md">Go back to <span className='text-warning font-bold'>nitdelhi.vercel.app</span></p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Make sure the Entered <span className='font-bold c400'>Roll No.</span> is similar to <Code className='c400'>201230012</Code> and of length 9</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        Redirecting to home page in {secondsRemaining} seconds ...
      </CardFooter>
    </Card>
    </div>
  )
}