"use client"

import { experiences, whatido } from "@/data/experiences"
import * as React from "react"
import { LandingComponent } from "./interfaces"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

const Experiences: LandingComponent = ({ className }) => {
    const [isTimelineOpen, setIsTimelineOpen] = React.useState(false)

    return (
        <section className={cn(`min-h-screen px-4 sm:px-6 pt-6 sm:pt-10 -mt-16 sm:-mt-20`, className)}>
            <div className="mx-auto max-w-[800px]">
                <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
                    {/* Timeline Column */}
                    <div>
                        <Collapsible open={isTimelineOpen} onOpenChange={setIsTimelineOpen} className="lg:hidden">
                            <CollapsibleTrigger asChild>
                                <Button variant="outline" className="mb-4 w-full">
                                    {isTimelineOpen ? "Hide Timeline" : "Show Timeline"}
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-6">
                                <h2 className="text-xl sm:text-2xl font-semibold">Work Experience</h2>
                                <div className="space-y-4 sm:space-y-6">
                                    {experiences.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative pl-6 sm:pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary"
                                        >
                                            <div className="text-sm text-muted-foreground">{item.period}</div>
                                            <div className="font-medium">{item.role}</div>
                                            <div className="text-sm text-muted-foreground">{item.company}</div>
                                        </div>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <div className="hidden space-y-6 lg:block">
                            <h2 className="text-2xl font-semibold">Work Experience</h2>
                            <div className="space-y-6">
                                {experiences.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary"
                                    >
                                        <div className="text-sm text-muted-foreground">{item.period}</div>
                                        <div className="font-medium">{item.role}</div>
                                        <div className="text-sm text-muted-foreground">{item.company}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Description Column */}
                    <div className="space-y-4 sm:space-y-6">
                        <h2 id="experience" className="text-xl sm:text-2xl font-semibold">What I Do</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            {whatido.description}
                        </p>
                        <ul className="grid gap-2 text-sm sm:text-base text-muted-foreground">
                            {whatido.list.map((point, index) => (
                                <li key={index} className="flex">
                                    <span className="mr-2">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experiences;
