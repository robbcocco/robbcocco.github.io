"use client"

import * as React from "react"
import Link from "next/link"
import { self } from "@/data/self"
import { LandingComponent } from "./interfaces"
import { cn } from "@/lib/utils"

const Contacts: LandingComponent = ({ className }) => {
    return (
        <section className={cn(`flex min-h-screen items-center justify-center px-4 sm:px-6 -mt-16 sm:-mt-20`, className)}>
            <div className="mx-auto max-w-[800px] text-center">
                <h2 id="contactme" className="mb-8 sm:mb-12 text-xl sm:text-2xl font-semibold">Get in Touch</h2>
                <div className="space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-base text-muted-foreground">
                        I'm always interested in hearing about new projects and opportunities.
                    </p>
                    {self.email ??
                        <div className="space-y-2">
                            <p className="font-medium text-sm sm:text-base">Email</p>
                            <p className="text-sm sm:text-base text-muted-foreground">{self.email}</p>
                        </div>}
                    {self.phone ??
                        <div className="space-y-2">
                            <p className="font-medium text-sm sm:text-base">Phone</p>
                            <p className="text-sm sm:text-base text-muted-foreground">{self.phone}</p>
                        </div>}
                    {self.location ??
                        <div className="space-y-2">
                            <p className="font-medium text-sm sm:text-base">Location</p>
                            <p className="text-sm sm:text-base text-muted-foreground">{self.location}</p>
                        </div>}
                    <div className="space-y-2">
                        <p className="font-medium">Social</p>
                        <div className="flex justify-center gap-4">
                            {self.social.map((social, index) => (
                                <Link key={index} href={social.url}
                                    className="text-muted-foreground hover:text-primary">
                                    {social.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts;
