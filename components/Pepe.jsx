import Image from 'next/image'
// import circles from '../public/circles.gif'
import circles from '../public/walk.gif'
import { motion } from 'framer-motion'

export default function Pepe() {
    return (
        <div className='py-4'>
            <motion.div
                key="pain"
                initial={{ x: -160 }}
                animate={{ x: "100vw" }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 15,
                    duration: 15,
                    ease: "linear"
                }}
            >
                <Image src={circles} width={160} height={160} unoptimized="true" alt="circles" className="absolute top-0" />
            </motion.div>

            <motion.div
                key="happy"
                initial={{ x: "100vw" }}
                animate={{ x: -160 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 15,
                    duration: 15,
                    ease: "linear",
                    delay: 15
                }}
            >
                <Image src={circles} width={160} height={160} unoptimized="true" alt="circles" className="scale-x-[-1] absolute top-0" />
            </motion.div>
        </div>
    )
}
