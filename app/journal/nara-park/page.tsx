"use client"

import { post } from "@/data/journal/nara-park"
import SideFilm from "@/components/journal/side-film"
import Image from "next/image"
import { X } from "lucide-react"
import { useState } from "react"
import FullscreenImageViewer from "@/components/journal/fullscreen-image-viewer"

const filmBrand = 'Ektar 100';

export default function BlogPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const main = [post.images[9], post.images[35], post.images[3], post.images[17], post.images[0], post.images[14], post.images[23]];

    return (
        <>
            <SideFilm post={post} slideshow={post.images} film_brand={filmBrand} setSelectedImage={setSelectedImage}>
                <div className='grid gap-y-2'>
                    {main.map((image: any, index: number) => (
                        <div key={index}>
                            <figure className='w-full' onClick={() => setSelectedImage(image.src)}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className='transition-all duration-300 w-full h-full align-bottom object-cover rounded-md'
                                />
                            </figure>
                        </div>
                    ))}
                </div>
            </SideFilm>

            <FullscreenImageViewer selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
        </>
    )
}
