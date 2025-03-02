"use client"

import { ChevronRight, Menu, Moon, Sun } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navigation } from "@/data/navigation"
import { useTheme } from "next-themes"


export default function Navbar() {
    const { setTheme, theme } = useTheme()

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
                    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
