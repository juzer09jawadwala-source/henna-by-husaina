"use client";

import { useEffect, useState, useMemo, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipFadeTextProps {
    /**
     * Array of words to cycle through
     */
    words?: string[];
    /**
     * Interval between word changes in milliseconds
     * @default 4500
     */
    interval?: number;
    /**
     * Additional CSS classes for the container
     */
    className?: string;
    /**
     * Additional CSS classes for the text
     */
    textClassName?: string;
    /**
     * Animation duration for each letter in seconds
     * @default 0.45
     */
    letterDuration?: number;
    /**
     * Stagger delay between letters on enter in seconds
     * @default 0.035
     */
    staggerDelay?: number;
}

const defaultWords = [
    "BESPOKE BRIDAL SUITES",
    "JAIPUR ROYAL HEIRLOOMS",
    "ORGANIC SOJAT BOTANICALS",
    "48-HOUR MAHOGANY STAIN",
    "CONTEMPORARY MINIMALIST"
];

// Memoized Letter component for performance
const Letter = memo(function Letter({
    char,
    charIndex,
    letterDuration,
    staggerDelay,
}: {
    char: string;
    charIndex: number;
    letterDuration: number;
    staggerDelay: number;
}) {
    return (
        <motion.span
            style={{ transformStyle: "preserve-3d" }}
            initial={{
                rotateX: 90,
                y: 18,
                opacity: 0,
                filter: "blur(6px)",
            }}
            animate={{
                rotateX: 0,
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                    delay: charIndex * staggerDelay,
                    duration: letterDuration,
                    ease: [0.16, 1, 0.3, 1],
                },
            }}
            exit={{
                rotateX: -90,
                y: -14,
                opacity: 0,
                filter: "blur(4px)",
                transition: {
                    duration: 0.32,
                    ease: "easeIn",
                },
            }}
            className="inline-block"
        >
            {char}
        </motion.span>
    );
});

// Memoized WordPhrase component
const WordPhrase = memo(function WordPhrase({
    text,
    staggerDelay,
    letterDuration,
    textClassName
}: {
    text: string;
    staggerDelay: number;
    letterDuration: number;
    textClassName?: string;
}) {
    const wordsList = useMemo(() => text.split(" "), [text]);

    // Calculate total character count and assign each letter a continuous global index
    let runningCharIndex = 0;

    return (
        <motion.div
            className={cn(
                "flex flex-wrap items-center justify-center font-serif text-white uppercase tracking-[0.25em] md:tracking-[0.32em]",
                textClassName
            )}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
            {wordsList.map((word, wordIdx) => (
                <span
                    key={`word-${wordIdx}`}
                    className="inline-flex items-center mr-[0.55em] last:mr-0 tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.32em]"
                >
                    {word.split("").map((char, charIdx) => {
                        const currentCharIdx = runningCharIndex++;
                        return (
                            <Letter
                                key={`${char}-${wordIdx}-${charIdx}`}
                                char={char}
                                charIndex={currentCharIdx}
                                letterDuration={letterDuration}
                                staggerDelay={staggerDelay}
                            />
                        );
                    })}
                </span>
            ))}
        </motion.div>
    );
});

export function FlipFadeText({
    words = defaultWords,
    interval = 4500,
    className,
    textClassName,
    letterDuration = 0.45,
    staggerDelay = 0.035,
}: FlipFadeTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { rootMargin: "100px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const updateIndex = useCallback(() => {
        setIndex((prev) => (prev + 1) % words.length);
    }, [words.length]);

    useEffect(() => {
        if (!isInView) return;

        let timer: ReturnType<typeof setInterval> | null = null;

        const startTimer = () => {
            if (!timer && document.visibilityState === "visible") {
                timer = setInterval(updateIndex, interval);
            }
        };

        const stopTimer = () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };

        startTimer();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                stopTimer();
            } else {
                startTimer();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            stopTimer();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [updateIndex, interval, isInView]);

    const currentWord = useMemo(() => words[index], [words, index]);

    return (
        <div ref={containerRef} className={cn("flex items-center justify-center min-h-[140px] sm:min-h-[160px]", className)}>
            <div className="relative flex items-center justify-center" style={{ perspective: "1000px" }}>
                <AnimatePresence mode="wait">
                    <WordPhrase
                        key={currentWord}
                        text={currentWord}
                        staggerDelay={staggerDelay}
                        letterDuration={letterDuration}
                        textClassName={textClassName}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}

export default FlipFadeText;
