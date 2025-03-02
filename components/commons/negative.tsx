"use client"

import { useEffect, useState } from "react"

export function Negative({ src, alt, containerClassName = "", className = "", ...props }: any) {
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

    if (isLoading || !dimensions) {
        return <div className={`relative aspect-[3/2] animate-pulse rounded-lg bg-muted ${containerClassName}`} />
    }

    const aspectRatio = dimensions.width / dimensions.height
    const containerAspectRatio = isPortrait ? 1 / aspectRatio : aspectRatio

    return (
        <div
            className={`relative overflow-hidden aspect-[3/2] rounded-sm ${containerClassName}`}
            style={{
                aspectRatio: containerAspectRatio,
            }}
        >
            <div
                className={`relative h-full w-full transition-all duration-300 ${containerClassName}`}
                style={{
                    transform: isPortrait ? `rotate(90deg) translateY(-60%)` : "none",
                    scale: isPortrait ? `${dimensions.width / dimensions.height}` : "1",
                    transformOrigin: "center",
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    className={`transition-all duration-300 align-bottom object-cover rounded-sm`}
                    style={{
                        objectFit: "cover",
                    }}
                />
            </div>
        </div>
    )
}

