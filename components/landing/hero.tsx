"use client"

import { self } from "@/data/self"
import { Github, Instagram, Linkedin, Camera, Film } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { LandingComponent } from "./interfaces"
import { cn } from "@/lib/utils"

const Hero: LandingComponent = ({ className }) => {
    return (
        <section className={cn(`flex min-h-screen items-center justify-center px-4 sm:px-6 mb-12 sm:mb-20`, className)}>
            <div className="mx-auto max-w-[800px] text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{self.title}</h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">{self.description}</p>
                <div className="mt-6 sm:mt-8 flex justify-center gap-4 sm:gap-6">
                    {self.social.map((social, index) => (
                        <Link
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            {social.name === "LinkedIn" ? <Linkedin className="h-6 w-6" /> : null}
                            {social.name === "GitHub" ? <Github className="h-6 w-6" /> : null}
                            {social.name === "Lomography" ? <Camera className="h-6 w-6" /> : null}
                            {social.name === "Instagram" ? <Instagram className="h-6 w-6" /> : null}
                            {social.name === "Letterboxd" ? <Film className="h-6 w-6" /> : null}
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero;
