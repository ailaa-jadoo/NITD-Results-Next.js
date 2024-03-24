'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import Image from 'next/image'
import PacMan from "@/components/PacMan";
import search from "../public/search-ezgif.com-crop (2).gif"

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
            <div className='overflow-hidden flex justify-center items-center h-screen'>
                <motion.div
                    style={{ opacity: 0, scale: 0.5, display: "block" }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] }
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}>

                    <form onSubmit={handleSubmit} className="flex justify-center">
                        <label htmlFor="rollNumber"></label>
                        <input
                            className='text-black p-2 rounded-full bg-slate-500'
                            type="text"
                            id="rollNumber"
                            placeholder='Student Roll No.'
                            value={rollNumber}
                            onChange={(event) => setRollNumber(event.target.value)}
                        />
                        {/* <button type="submit" className='button p-2 bg-purple-400 rounded-full ml-1 text-xl'>  */}
                        <button type="submit" className='button ml-1 text-xl'> 
                            <Image src={search} width={50} unoptimized="true" alt="pacGif" className="rounded-full"/>
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
