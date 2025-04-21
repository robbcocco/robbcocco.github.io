"use client"

import { projects, Project } from "@/data/projects"
import { Github } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { LandingComponent } from "./interfaces"
import { cn } from "@/lib/utils"

const reduceArray = <T,>(array: T[], size: number): T[][] => {
    return array.reduce((resultArray: T[][], item: T, index: number) => {
        const chunkIndex = Math.floor(index / size)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])
}

const projectsByTwo = reduceArray<Project>(projects, 2);
const projectsByFour = reduceArray<Project>(projects, 4);

const Projects: LandingComponent = ({ className }) => {
    return (
        <section className={cn(`min-h-screen px-4 sm:px-6 pt-6 sm:pt-10 -mt-16 sm:-mt-20`, className)}>
            <div className="mx-auto max-w-[800px]">
                <h2 id="projects" className="mb-8 sm:mb-12 text-xl sm:text-2xl font-semibold">Projects</h2>
                {/* Desktop Grid */}
                <div className="relative hidden lg:block">
                    <div className="no-scrollbar">
                        <div className="flex snap-x snap-mandatory overflow-x-auto lg:gap-6">
                            {projectsByFour.map((projects: Project[], index: number) => (
                                <div key={index} className="min-w-[calc(100%-2rem)] snap-center">
                                    <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                                        {projects.map((project: Project, index: number) => (
                                            <div key={index} className="rounded-lg border bg-card p-4 sm:p-6 mb-6 lg:mb-0">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-medium">{project.name}</h3>
                                                        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                                                    </div>
                                                    <Link href={project.url} className="text-muted-foreground transition-colors hover:text-primary ml-4">
                                                        <Github className="h-5 w-5" />
                                                    </Link>
                                                </div>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {project.technologies?.map((tech: any, techIndex: number) => (
                                                        <div key={techIndex} className="rounded-full bg-primary/10 px-2 sm:px-3 py-1 text-xs text-primary">
                                                            {tech}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Mobile Scroll */}
                <div className="relative lg:hidden -mx-4 sm:-mx-6">
                    <div className="no-scrollbar grid gap-4 sm:gap-6 px-4 sm:px-6">
                        <div className="-mx-4 sm:-mx-6 flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 pb-4 sm:pb-6">
                            {projectsByTwo.map(([upper, lower]: Project[], index: number) => (
                                <div key={index} className="min-w-[calc(100%-2rem)] snap-center">
                                    <div className="rounded-lg border bg-card p-4 sm:p-6 mb-4 sm:mb-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium">{upper.name}</h3>
                                                <p className="mt-2 text-sm text-muted-foreground">{upper.description}</p>
                                            </div>
                                            <Link href={upper.url} className="text-muted-foreground transition-colors hover:text-primary ml-4">
                                                <Github className="h-5 w-5" />
                                            </Link>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {upper.technologies?.map((tech: any, techIndex: number) => (
                                                <div key={techIndex} className="rounded-full bg-primary/10 px-2 sm:px-3 py-1 text-xs text-primary">
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {lower && (
                                        <div className="rounded-lg border bg-card p-4 sm:p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-medium">{lower.name}</h3>
                                                    <p className="mt-2 text-sm text-muted-foreground">{lower.description}</p>
                                                </div>
                                                <Link href={lower.url} className="text-muted-foreground transition-colors hover:text-primary ml-4">
                                                    <Github className="h-5 w-5" />
                                                </Link>
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {lower.technologies?.map((tech: any, techIndex: number) => (
                                                    <div key={techIndex} className="rounded-full bg-primary/10 px-2 sm:px-3 py-1 text-xs text-primary">
                                                        {tech}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects;
