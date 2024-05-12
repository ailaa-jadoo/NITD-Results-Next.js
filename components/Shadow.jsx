import React from 'react'
import { Divider, Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion"

const items = Array.from({ length: 4 }, (_, index) => (
    <Skeleton key={index} isLoaded={true} className="rounded-lg">
        <div className="h-14 rounded-lg bg-gradient-to-r from-sky-100 to-sky-600"></div>
    </Skeleton>
));

export default function Shadow() {
    return (
        <div className="mt-32">
            <motion.div
                initial={{ x: -1000, scale: 0 }}
                animate={{
                    x: [-1000, 0],
                    scale: [0, 1],
                }}
                transition={{ type: "spring", ease: 'easeInOut', duration: 0.75, delay: 0, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" }}
            >
                <Skeleton className="rounded-lg max-w-3xl sm:mx-auto mx-4">
                    <div className="h-14 rounded-lg"></div>
                </Skeleton> 
                <div className="max-w-3xl mx-4 sm:mx-auto p-4 mt-3 mb-7 bg-[#18181B] rounded-2xl shadow-small">
                    <div className="w-4/5 flex items-center gap-3">
                        <div>
                            <Skeleton className="flex rounded-full w-16 h-16 bg-gradient-to-r from-sky-100 to-sky-600" isLoaded={true} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-3 w-3/5 rounded-lg bg-gradient-to-r from-sky-100 to-sky-600" isLoaded={true} />
                            <Skeleton className="h-3 w-2/5 rounded-lg bg-gradient-to-r from-sky-100 to-sky-600" isLoaded={true} />
                            <Skeleton className="h-3 w-5/5 rounded-lg bg-gradient-to-r from-sky-100 to-sky-600" isLoaded={true} />
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ x: -1000, scale: 0 }}
                animate={{
                    x: [-1000, 0],
                    scale: [0, 1],
                }}
                transition={{ type: "spring", ease: 'easeInOut', duration: 0.75, delay: 0.5, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" }}
            >
                <Skeleton className="rounded-lg max-w-3xl sm:mx-auto mx-4">
                    <div className="h-14 rounded-lg"></div>
                </Skeleton> 
                <div className="max-w-3xl mx-4 sm:mx-auto p-4 mt-3 mb-7 bg-[#18181B] rounded-2xl shadow-small">
                    <Skeleton isLoaded={true} className="rounded-lg">
                        <div className="h-48 rounded-lg bg-gradient-to-r from-sky-100 to-sky-600"></div>
                    </Skeleton>
                </div>
            </motion.div>
            <motion.div
                initial={{ x: -1000, scale: 0 }}
                animate={{
                    x: [-1000, 0],
                    scale: [0, 1],
                }}
                transition={{ type: "spring", ease: 'easeInOut', duration: 0.75, delay: 1, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" }}
            >
                <Skeleton className="rounded-lg max-w-3xl sm:mx-auto mx-4">
                    <div className="h-14 rounded-lg"></div>
                </Skeleton> 
                <div className="max-w-3xl mx-4 sm:mx-auto p-4 mt-3 mb-7 bg-[#18181B] rounded-2xl shadow-small flex flex-col gap-6">
                    <>
                        {items}
                    </>
                </div>
            </motion.div>
        </div>
    )
}