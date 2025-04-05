"use client"

import { useEffect, useState } from "react"

interface NegativeProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    containerClassName?: string
    className?: string
    portrait?: boolean
}

interface ImageDimensions {
    width: number
    height: number
}

export function Negative({ 
    src, 
    alt, 
    containerClassName = "", 
    className = "", 
    portrait = false,
    ...props 
}: NegativeProps) {
    const [imageState, setImageState] = useState<{
        isPortrait: boolean
        dimensions: ImageDimensions | null
        isLoading: boolean
        error: string | null
    }>({
        isPortrait: false,
        dimensions: null,
        isLoading: true,
        error: null
    })

    useEffect(() => {
        const img = new Image()
        
        const handleLoad = () => {
            setImageState(prev => ({
                ...prev,
                isPortrait: img.height > img.width,
                dimensions: { width: img.width, height: img.height },
                isLoading: false
            }))
        }

        const handleError = () => {
            setImageState(prev => ({
                ...prev,
                isLoading: false,
                error: "Failed to load image"
            }))
        }

        img.onload = handleLoad
        img.onerror = handleError
        img.src = src

        return () => {
            img.onload = null
            img.onerror = null
        }
    }, [src])

    if (imageState.isLoading) {
        return (
            <div 
                className={`relative ${portrait ? "aspect-[2/3]" : "aspect-[3/2]"} animate-pulse rounded-lg bg-muted ${containerClassName}`}
                aria-label="Loading image..."
            />
        )
    }

    if (imageState.error) {
        return (
            <div 
                className={`relative ${portrait ? "aspect-[2/3]" : "aspect-[3/2]"} flex items-center justify-center bg-muted ${containerClassName}`}
            >
                <p className="text-sm text-gray-500">Failed to load image</p>
            </div>
        )
    }

    const aspectRatio = portrait ? "aspect-[2/3]" : "aspect-[3/2]"
    const shouldRotate = portrait 
        ? imageState.dimensions!.width > imageState.dimensions!.height
        : imageState.isPortrait
    const scale = imageState.dimensions!.width / imageState.dimensions!.height
    const containerAspectRatio = portrait ?
    (imageState.isPortrait ? imageState.dimensions!.width / imageState.dimensions!.height : imageState.dimensions!.height/imageState.dimensions!.width)
    :
    (imageState.isPortrait ? imageState.dimensions!.height/imageState.dimensions!.width : imageState.dimensions!.width/imageState.dimensions!.height)

    // Calculate the translation percentage based on image dimensions
    const calculateTranslateY = () => {
        if (!shouldRotate) return 0

        const rotatedAspectRatio = 1 / containerAspectRatio
        
        // Calculate the difference between container height and rotated image height
        const difference = (rotatedAspectRatio - containerAspectRatio) / 2
        
        // Convert to percentage and adjust direction based on portrait mode
        return portrait ? (difference * 100) : -(difference * 100)
    }

    const translateY = portrait ? `${calculateTranslateY()}%` : `-${calculateTranslateY()}%`

    return (
        <div
            className={`relative overflow-hidden ${aspectRatio} rounded-sm ${containerClassName}`}
            style={{ aspectRatio: containerAspectRatio }}
        >
            <div
                className={`relative h-full w-full transition-all duration-300 ${containerClassName}`}
                style={{
                    transform: shouldRotate 
                        ? `rotate(90deg) translateY(${translateY}) scale(${scale})`
                        : "none",
                    transformOrigin: "center",
                }}
            >
                <img
                    {...props}
                    src={src}
                    alt={alt}
                    className={`transition-all duration-300 align-bottom object-cover rounded-sm hover:[filter:invert(100%)] ${className}`}
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    )
}

