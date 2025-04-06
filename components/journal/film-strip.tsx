import { FilmStripProps } from "./types";
import { useEffect, useRef, useState } from "react";

export const FilmStrip = ({ children, filmBrand, index, onClick }: FilmStripProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [sprocketCount, setSprocketCount] = useState(6);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const updateSprocketCount = () => {
            if (contentRef.current) {
                const height = contentRef.current.offsetHeight;
                setContentHeight(height);
                // Calculate number of sprockets based on height
                // Assuming each sprocket is 12px (h-3) plus some spacing
                const spacing = 15; // Approximate spacing between sprockets
                const newCount = Math.max(6, Math.floor(height / spacing));
                setSprocketCount(newCount);
            }
        };

        updateSprocketCount();
        // Add resize observer to update sprocket count if content size changes
        const resizeObserver = new ResizeObserver(updateSprocketCount);
        if (contentRef.current) {
            resizeObserver.observe(contentRef.current);
        }

        return () => {
            if (contentRef.current) {
                resizeObserver.unobserve(contentRef.current);
            }
        };
    }, []);

    const getFilmCode = (index?: number) => {
        if (!index) return '';
        
        // Calculate the number of pattern repetitions based on height
        const baseLength = 2; // Minimum number of pattern repetitions
        const additionalLength = Math.floor(contentHeight / 100); // Add more patterns for every 100px
        const repetitions = Math.max(baseLength, Math.min(5, baseLength + additionalLength));
        
        // Create an array of different patterns to choose from based on the index
        const patterns = [
            '▥', '▤', '▨', '░', '▒', '▓', '█', '▚', '▞', '▙', '▟', '▛', '▜'
        ];
        
        const symbols = ['◢', '◣', '◤', '◥', '△', '▽', '□', '◇'];
        const sym1 = symbols[index % symbols.length];
        const sym2 = symbols[(index + 2) % symbols.length];
        
        // Generate pattern sequence
        let patternSequence = '';
        for (let i = 0; i < repetitions; i++) {
            const pattern1 = patterns[(index + i) % patterns.length];
            const pattern2 = patterns[(index + i + 3) % patterns.length];
            patternSequence += pattern1 + pattern2;
        }
        
        // Format the frame number with padding
        const frameNum = index.toString().padStart(2, '0');
        
        // Combine everything into a film-like code
        return `${sym1}${patternSequence}${sym2} ${frameNum}A ${sym2}${patternSequence.split('').reverse().join('')}${sym1}`;
    };

    return (
        <div className="relative overflow-hidden">
            <div className={`absolute left-0 top-0 z-20 h-full w-4 bg-background`}>
                <div className="flex h-full flex-col justify-between pt-1">
                    {Array.from({ length: sprocketCount }).map((_, i) => (
                        <div key={i} className="h-3 w-4 rounded-sm border-2 dark:border-[#EC7532] border-muted-foreground" />
                    ))}
                </div>
            </div>
            <div className={`absolute left-0 top-0 z-20 h-full w-4`}>
                <div className="pb-10 -translate-y-1/2 rotate-90 transform whitespace-nowrap">
                    <span className="font-mono text-[10px] tracking-[0.12em] dark:text-[#EC7532] text-muted-foreground opacity-90">
                        {getFilmCode(index)}
                    </span>
                </div>
            </div>
            <div className={`absolute right-0 top-0 z-20 h-full w-4 bg-background`}>
                <div className="flex h-full flex-col justify-between pt-1">
                    {Array.from({ length: sprocketCount }).map((_, i) => (
                        <div key={i} className="h-3 w-4 rounded-sm border-2 dark:border-[#EC7532] border-muted-foreground" />
                    ))}
                </div>
            </div>
            {filmBrand && (
                <div className={`absolute right-0 top-0 z-20 h-full w-4`}>
                    <div className="pb-12 absolute top-1/2 right-0 -translate-y-1/2 rotate-90 transform whitespace-nowrap">
                        <span className="font-mono text-[12px] tracking-[0.25em] dark:text-[#EC7532] text-muted-foreground opacity-90 uppercase">
                            {filmBrand}
                        </span>
                    </div>
                </div>
            )}
            <div ref={contentRef} className="w-full h-full px-8 cursor-pointer py-1" onClick={onClick}>
                {children}
            </div>
        </div>
    );
}; 