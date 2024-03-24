import Image from 'next/image'
import circles from '../public/circles.gif'
import { motion } from 'framer-motion'

export default function Pepe() {
    return (
        <div className='py-4'>
            <motion.div
                key="pain"
                initial={{ x: -112 }}
                animate={{ x: "100vw" }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 7,
                    duration: 7,
                    ease: "linear"
                }}
            >
                <Image src={circles} width={112} height={112} unoptimized="true" alt="circles" className="absolute top-0" />
            </motion.div>

            <motion.div
                key="happy"
                initial={{ x: "100vw" }}
                animate={{ x: -112 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 7,
                    duration: 7,
                    ease: "linear",
                    delay: 7
                }}
            >
                <Image src={circles} width={112} height={112} unoptimized="true" alt="circles" className="scale-x-[-1] absolute top-0" />
            </motion.div>
        </div>
    )
}
