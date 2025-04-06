"use client"

import { ChevronRight, Menu } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { navigation } from "@/data/navigation"

export default function Navbar() {
    return (
        <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-background px-6 py-5">
            <div className="mx-auto flex w-full max-w-[800px] items-center justify-between">
                <div className="flex items-center gap-2">
                    <ChevronRight className="h-5 w-5" />
                    <span className="text-lg font-medium pb-1">roberto cocco</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex md:gap-6">
                        {navigation.map((item, index) => (
                            <Link key={index} href={item.url} className="text-sm hover:text-primary">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className="mt-8 flex flex-col gap-4">
                                {navigation.map((item, index) => (
                                    <Link key={index} href={item.url} className="text-lg hover:text-primary">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}
