'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import Image from 'next/image'
import PacMan from "@/components/PacMan";
import search from "../public/search-ezgif.com-crop (2).gif"
import { Code, Input } from '@mantine/core';

export default function Home() {
    const router = useRouter()
    const [rollNumber, setRollNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        router.push(`/profile?rollNumber=${rollNumber}`);
    };

    return (
        <div className="overflow-x-hidden">
            <PacMan />
            <div className='overflow-hidden flex justify-center items-center fullScreen'>
                <motion.div
                    style={{ opacity: 0, scale: 0.5, display: "block" }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] }
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                >
                    <h2 className='c400 text-xl xl:text-2xl text-center xl:mb-6 mb-4'>Similar to ~ <Code color="var(--mantine-color-yellow-light)" className='text-warning text-xl xl:text-2xl'>201230012</Code></h2>
                    <form onSubmit={handleSubmit} className="flex justify-center xl:scale-150">
                        <label htmlFor="rollNumber"></label>    
                        <Input size="lg" className='mr-1' radius="xl" placeholder="Student Roll No." id="rollNumber" value={rollNumber} onChange={(event) => setRollNumber(event.target.value)} />
                        <button type="submit" className='button ml-1 text-xl'> 
                            <Image src={search} width={50} unoptimized="true" alt="pacGif" className="rounded-full"/>
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}