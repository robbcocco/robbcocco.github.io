import { FilmStripProps } from "./types";
import { useEffect, useRef, useState } from "react";

export const FilmStrip = ({ children, filmBrand, index, onClick }: FilmStripProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [sprocketCount, setSprocketCount] = useState(6);

    useEffect(() => {
        const updateSprocketCount = () => {
            if (contentRef.current) {
                const height = contentRef.current.offsetHeight;
                // Calculate number of sprockets based on height
                // Assuming each sprocket is 12px (h-3) plus some spacing
                const spacing = 16; // Approximate spacing between sprockets
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
                <div className="pb-8 rotate-[90deg] transform whitespace-nowrap">
                    <span className="text-xs -translate-y-1/2 tracking-tight dark:text-[#EC7532] text-muted-foreground">
                        {`░▌ ▒░▌ ░▒░▒${index ? index + 1 : ''}A`}
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
                    <div className="pt-8 rotate-90 transform whitespace-nowrap">
                        <span className="text-xs -translate-y-1/2 tracking-widest dark:text-[#EC7532] text-muted-foreground">
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