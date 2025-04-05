"use client"

import { self } from "@/data/self"
import { Github, Instagram, Linkedin, Camera, Film } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { LandingComponent } from "./interfaces"
import { cn } from "@/lib/utils"

const Hero: LandingComponent = ({ className }) => {
    return (
        <section className={cn(`flex min-h-screen items-center justify-center px-6 mb-20`, className)}>
            <div className="mx-auto max-w-[800px] text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{self.title}</h1>
                <p className="mt-6 text-lg text-muted-foreground">{self.description}</p>
                <div className="mt-8 flex justify-center gap-6">
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
