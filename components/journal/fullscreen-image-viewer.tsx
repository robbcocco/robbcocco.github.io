"use client"

import Image from "next/image"
import { X } from "lucide-react"

interface FullscreenImageViewerProps {
  selectedImage: string | null
  onClose: () => void
}

export default function FullscreenImageViewer({ selectedImage, onClose }: FullscreenImageViewerProps) {
  if (!selectedImage) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6"
      onClick={onClose}
    >
      <button
        className="absolute right-6 top-6 rounded-full bg-background p-2 text-foreground shadow-md"
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </button>
      <div className="relative h-[80vh] w-full max-w-5xl">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Enlarged view"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
} 