"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Negative } from "../commons/negative"

export default function ScrollingFilm({
    children,
    slideshow,
    film_brand = "",
    setSelectedImage
}: {
    children: React.ReactNode,
    slideshow: any[],
    film_brand: string
    setSelectedImage: (image: string | null) => void
}) {
    const [height, setHeight] = useState<number>(0)
    const [mobileHeight, setMobileHeight] = useState<number>(0)
    const [ratio, setRatio] = useState<number>(0)

    const mainContentRef = useRef<HTMLDivElement>(null)
    const sideContentRef = useRef<HTMLDivElement>(null)
    const mobileContentRef = useRef<HTMLDivElement>(null)

    const updateHeight = useCallback(() => {
        if (mainContentRef.current && sideContentRef.current && mobileContentRef.current) {
            const mainContent = mainContentRef.current
            const sideContent = sideContentRef.current
            const mobileContent = mobileContentRef.current
            const ratio =
                (sideContent.scrollHeight) /
                (mainContent.scrollHeight);
            setMobileHeight(mobileContent.scrollHeight - window.innerHeight)
            setHeight(mainContent.scrollHeight)
            setRatio(ratio)
        }
    }, [])

    useEffect(() => {
        const mainContent = mainContentRef.current
        const sideContent = sideContentRef.current

        if (!mainContent || !sideContent) return

        // Initial height calculation
        updateHeight()

        // Set up ResizeObserver for both columns
        const resizeObserver = new ResizeObserver(() => {
            updateHeight()
        })

        resizeObserver.observe(mainContent)
        resizeObserver.observe(sideContent)

        let frameId: number

        const handleScroll = () => {
            const scrolled = window.scrollY

            if (sideContent) {
                if (window.scrollY < mainContent.offsetTop) {
                    sideContent.style.transform = `translateY(0)`
                } else if (window.scrollY + window.innerHeight >= mainContent.offsetTop + mainContent.scrollHeight) {
                    sideContent.style.transform = `translateY(${(mainContent.scrollHeight) * (1 - ratio)}px)`
                } else {
                    const scrollPercent = (scrolled - mainContent.offsetTop) / (mainContent.scrollHeight - window.innerHeight);
                    sideContent.style.transform = `translateY(${((scrolled - mainContent.offsetTop + (window.innerHeight * scrollPercent)) * (1 - ratio))}px)`
                }
            }

            frameId = requestAnimationFrame(handleScroll)
        }

        frameId = requestAnimationFrame(handleScroll)

        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId)
            }
            resizeObserver.disconnect()
        }
    }, [updateHeight, ratio])

    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <div style={{ height: height ? `${height}px` : "auto" }} id="container" className="grid gap-2 lg:grid-cols-12">
                    {/* Main Content */}
                    <div ref={mainContentRef} id="content" className="h-min col-span-8 py-2">
                        {children}
                    </div>

                    {/* Side Content */}
                    <div ref={sideContentRef} className={`h-min col-span-4 bg-background`}>
                        <div className='grid gap-y-2'>
                            {slideshow.map((image: any, index: number) => (
                                <div key={index}>
                                    <div className="relative overflow-hidden">
                                        <div className={`absolute left-0 top-0 z-20 h-full w-4 bg-background`}>
                                            <div className="flex h-full flex-col justify-between pt-1">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <div key={i} className="h-3 w-4 rounded-sm border-2 dark:border-[#EC7532] border-muted-foreground" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className={`absolute left-0 top-0 z-20 h-full w-4`}>
                                            <div className="pb-8 rotate-[90deg] transform whitespace-nowrap">
                                                <span className="text-xs -translate-y-1/2 tracking-tight dark:text-[#EC7532] text-muted-foreground">{`░▌ ▒░▌ ░▒░▒${index + 1}A`}</span>
                                            </div>
                                        </div>
                                        <div className={`absolute right-0 top-0 z-20 h-full w-4 bg-background`}>
                                            <div className="flex h-full flex-col justify-between pt-1">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <div key={i} className="h-3 w-4 rounded-sm border-2 dark:border-[#EC7532] border-muted-foreground" />
                                                ))}
                                            </div>
                                        </div>
                                        {(index + 2) % 3 === 0 &&
                                            <div className={`absolute right-0 top-0 z-20 h-full w-4`}>
                                                <div className="pt-8 rotate-90 transform whitespace-nowrap">
                                                    <span className="text-xs -translate-y-1/2 tracking-widest dark:text-[#EC7532] text-muted-foreground">{film_brand}</span>
                                                </div>
                                            </div>
                                        }
                                        <figure className='w-full h-full px-8 cursor-pointer' onClick={() => setSelectedImage(image.src)}>
                                            <Negative src={image.src} alt={image.alt} portrait={false} />
                                        </figure>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="block lg:hidden">
                <div className={`h-min col-span-4 bg-background`}>
                    <div className='grid gap-y-2'>

                        <div className="relative overflow-hidden">
                            <div className={`absolute left-0 top-0 z-20 h-full w-4 bg-background`}>
                                <div className="flex h-full flex-col justify-between pt-1">
                                    {Array.from({ length: mobileHeight / 10 }).map((_, i) => (
                                        <div key={i} className="h-3 w-4 rounded-sm border-2 dark:border-[#EC7532] border-muted-foreground" />
                                    ))}
                                </div>
                            </div>
                            <div className={`absolute left-0 top-0 z-20 h-full w-4`}>
                                {Array.from({ length: mobileHeight / 10 }).map((_, i) => (
                                    <>
                                        <div className="pb-20 pt-12 rotate-[90deg] transform whitespace-nowrap">
                                            <span className="text-xs -translate-y-1/2 dark:text-[#EC7532] text-muted-foreground">{`░▌ ▒░▌ ░▒░▒${i + 1}A ▌░░`}</span>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <div className={`absolute right-0 top-0 z-20 h-full w-4 bg-background`}>
                                <div className="flex h-full flex-col justify-between pt-1">
                                    {Array.from({ length: mobileHeight / 10 }).map((_, i) => (
                                        <div key={i} className="h-3 w-4 rounded-sm border-2 dark:border-[#EC7532] border-muted-foreground" />
                                    ))}
                                </div>
                            </div>
                            <div className={`absolute right-0 top-0 z-20 h-full w-4`}>
                                {Array.from({ length: mobileHeight / 10 }).map((_, i) => (
                                    <>
                                        <div key={i} className="pt-20 pb-12 rotate-90 transform whitespace-nowrap">
                                            <span className="text-xs -translate-y-1/2 tracking-widest dark:text-[#EC7532] text-muted-foreground">{(i) % 3 === 0 ? film_brand : ""}</span>
                                        </div>

                                    </>
                                ))}
                            </div>
                            <div ref={mobileContentRef} id="content" className="h-min col-span-8 py-2 px-8">
                                {children}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
