"use client"

import NavbarLite from "@/components/commons/navbar-lite"
import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import ScrollingFilm from "./scrolling-film"

export default function PostSideFilm({
    children,
    post,
    slideshow,
    film_brand = ""
}: {
    children: React.ReactNode,
    post: any,
    slideshow: any[],
    film_brand: string
}) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    useEffect(() => {
        
    }, [])

    return (
        <main className="min-h-screen bg-background">
            <NavbarLite />

            <div className="border-b bg-muted px-6 py-12 mt-20 z-30">
                <div className="mx-auto max-w-[800px]">
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">{post.date}</div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {post.title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {post.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[800px]">
                <div className="mx-auto h-min">
                    <ScrollingFilm children={children} slideshow={slideshow} film_brand={film_brand} setSelectedImage={setSelectedImage}  />                    
                </div >
            </div>

            {/* Fullscreen Image Viewer */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute right-6 top-6 rounded-full bg-background p-2 text-foreground shadow-md"
                        onClick={() => setSelectedImage(null)}
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
            )}
        </main>
    )
}
