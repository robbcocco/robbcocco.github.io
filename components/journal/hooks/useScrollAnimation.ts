import { useCallback, useEffect, useRef, useState } from "react";
import { UseScrollAnimationReturn } from "../types";

export const useScrollAnimation = (): UseScrollAnimationReturn => {
    const [height, setHeight] = useState<number>(0);
    const [mobileHeight, setMobileHeight] = useState<number>(0);
    const [ratio, setRatio] = useState<number>(0);

    const mainContentRef = useRef<HTMLDivElement>(null);
    const sideContentRef = useRef<HTMLDivElement>(null);
    const mobileContentRef = useRef<HTMLDivElement>(null);

    const updateHeight = useCallback(() => {
        if (mainContentRef.current && sideContentRef.current && mobileContentRef.current) {
            const mainContent = mainContentRef.current;
            const sideContent = sideContentRef.current;
            const mobileContent = mobileContentRef.current;
            const ratio = sideContent.scrollHeight / mainContent.scrollHeight;
            
            setMobileHeight(mobileContent.scrollHeight - window.innerHeight);
            setHeight(mainContent.scrollHeight);
            setRatio(ratio);
        }
    }, []);

    useEffect(() => {
        const mainContent = mainContentRef.current;
        const sideContent = sideContentRef.current;

        if (!mainContent || !sideContent) return;

        updateHeight();

        const resizeObserver = new ResizeObserver(() => {
            updateHeight();
        });

        resizeObserver.observe(mainContent);
        resizeObserver.observe(sideContent);

        let frameId: number;

        const handleScroll = () => {
            const scrolled = window.scrollY;

            if (sideContent) {
                if (scrolled < mainContent.offsetTop) {
                    sideContent.style.transform = `translateY(0)`;
                } else if (scrolled + window.innerHeight >= mainContent.offsetTop + mainContent.scrollHeight) {
                    sideContent.style.transform = `translateY(${(mainContent.scrollHeight) * (1 - ratio)}px)`;
                } else {
                    const scrollPercent = (scrolled - mainContent.offsetTop) / (mainContent.scrollHeight - window.innerHeight);
                    sideContent.style.transform = `translateY(${((scrolled - mainContent.offsetTop + (window.innerHeight * scrollPercent)) * (1 - ratio))}px)`;
                }
            }

            frameId = requestAnimationFrame(handleScroll);
        };

        frameId = requestAnimationFrame(handleScroll);

        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
            resizeObserver.disconnect();
        };
    }, [updateHeight, ratio]);

    return {
        mainContentRef,
        sideContentRef,
        mobileContentRef,
        height,
        mobileHeight,
    };
}; 