"use client"

import { self } from "@/data/self"
import { Film, Github, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import * as React from "react"

export default function Hero({ background }: { background: string }) {
    return (
        <section className={`sticky top-0 flex min-h-screen items-center justify-center ${background} px-6 mb-20`}>
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
                            {social.name === "Lomography" ? <Film className="h-6 w-6" /> : null}
                            {social.name === "Instagram" ? <Instagram className="h-6 w-6" /> : null}
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
