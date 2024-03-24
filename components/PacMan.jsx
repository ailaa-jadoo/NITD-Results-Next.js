import Image from 'next/image'
// import pacGhost from '../public/pacGhost.jpg'
import pacGif from '../public/pacGif.gif' 
import { motion } from 'framer-motion'

export default function Pepe() {
    return (
        <div className='py-4'>
            <motion.div
                key="pain"
                initial={{ x: -356 }}
                animate={{ x: "100vw" }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 10,
                    duration: 10,
                    ease: "linear"
                }}
            >
                <Image src={pacGif} width={320} unoptimized="true" alt="pacGif" className="absolute top-0" />
            </motion.div>

            <motion.div
                key="happy"
                initial={{ x: "100vw" }}
                animate={{ x: -320 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 10,
                    duration: 10,
                    ease: "linear",
                    delay: 10
                }}
            >
                <Image src={pacGif} width={320} unoptimized="true" alt="pacGif" className="scale-x-[-1] absolute top-0" />
            </motion.div>
        </div>
    )
}
