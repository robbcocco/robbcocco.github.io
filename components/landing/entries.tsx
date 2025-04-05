"use client"

import * as React from "react"
import Link from "next/link"
import { latest } from "@/data/latest"
import { LandingComponent } from "./interfaces"
import { cn } from "@/lib/utils"

const Entries: LandingComponent = ({ className }) => {
  return (
    <section id="latest" className={cn(`min-h-screen px-6 pt-10 -mt-20`, className)}>
      <div className="mx-auto max-w-[800px]">
        <h2 className="mb-12 text-2xl font-semibold">Latest Posts</h2>
        <div className="relative">
          {latest.map((item, index) => (
            <article key={index} className="space-y-4">
              <div className="text-sm text-muted-foreground">{item.date}</div>
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              <Link href={`/journal/${item.slug}`} className="inline-block text-sm text-primary hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Entries;
