"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function NavbarLite({ title }: any) {
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
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}
