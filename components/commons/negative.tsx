"use client"

import { useEffect, useState } from "react"

export function Negative({ src, alt, containerClassName = "", className = "", portrait = false, ...props }: any) {
    const [isPortrait, setIsPortrait] = useState(false)
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (typeof src !== "string") return
        const img = new Image()
        img.src = src
        img.onload = () => {
            setIsPortrait(img.height > img.width)
            setDimensions({ width: img.width, height: img.height })
            setIsLoading(false)
        }
    }, [src])

    if (isLoading) {
        return <div className={`relative ${portrait ? "aspect-[2/3]" : "aspect-[3/2]"} animate-pulse rounded-lg bg-muted ${containerClassName}`} />
    }

    if (portrait) {
        const shouldRotate = dimensions!.width > dimensions!.height
        return (
            <div
                className={`relative overflow-hidden aspect-[2/3] rounded-sm ${containerClassName}`}
                style={{ aspectRatio: 2/3 }}
            >
                <div
                    className={`relative h-full w-full transition-all duration-300 ${containerClassName}`}
                    style={{
                        transform: shouldRotate ? `rotate(90deg) translateY(41.5%) scale(${dimensions!.width / dimensions!.height})` : "scale(1)",
                        transformOrigin: "center"
                    }}
                >
                    <img
                        src={src}
                        alt={alt}
                        className={`transition-all duration-300 align-bottom object-cover rounded-sm ${className}`}
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div
            className={`relative overflow-hidden aspect-[3/2] rounded-sm ${containerClassName}`}
            style={{ aspectRatio: 3/2 }}
        >
            <div
                className={`relative h-full w-full transition-all duration-300 ${containerClassName}`}
                style={{
                    transform: isPortrait ? `rotate(90deg) translateY(-41.5%) scale(${dimensions!.width / dimensions!.height})` : "none",
                    transformOrigin: "center",
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    className={`transition-all duration-300 align-bottom object-cover rounded-sm ${className}`}
                    style={{
                        objectFit: "cover",
                    }}
                />
            </div>
        </div>
    )
}

