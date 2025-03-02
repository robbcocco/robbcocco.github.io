"use client"

import { ChevronLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"


export default function NavbarLite({ title }: any) {
    const { setTheme, theme } = useTheme()

    return (
        <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-background px-6 py-5">
            <div className="mx-auto flex w-full max-w-[800px] items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 text-sm hover:text-primary">
                        <ChevronLeft className="h-5 w-5" />
                        <span className="text-lg font-medium pb-1">roberto cocco</span>
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    {title?.toLowerCase()}
                </div>
                <div className="flex items-center gap-6">
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
