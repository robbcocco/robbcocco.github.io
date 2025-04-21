"use client"

import NavbarLite from "@/components/commons/navbar-lite"
import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import ScrollingFilm from "./scrolling-film"

export default function SideFilm({
    children,
    post,
    slideshow,
    film_brand = "",
    setSelectedImage
}: {
    children: React.ReactNode,
    post: any,
    slideshow: any[],
    film_brand: string,
    setSelectedImage: (image: string | null) => void
}) {
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
        </main>
    )
}
