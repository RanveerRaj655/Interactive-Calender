"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    monthKey: string; // e.g. "2024-3" — triggers animation on change
    children: React.ReactNode;
    direction: 1 | -1;  // 1 = forward, -1 = backward
}

const variants = {
    enter: (dir: number) => ({
        rotateX: dir > 0 ? -8 : 8,
        opacity: 0,
        y: dir > 0 ? 24 : -24,
        scale: 0.97,
    }),
    center: {
        rotateX: 0,
        opacity: 1,
        y: 0,
        scale: 1,
    },
    exit: (dir: number) => ({
        rotateX: dir > 0 ? 8 : -8,
        opacity: 0,
        y: dir > 0 ? -24 : 24,
        scale: 0.97,
    }),
};

export function MonthFlip({ monthKey, children, direction }: Props) {
    return (
        <div style={{ perspective: "1200px" }} className="w-full h-full">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={monthKey}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: 0.38,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="w-full h-full origin-top"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}