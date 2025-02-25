"use client"

import { useTheme } from "next-themes"
import * as React from "react"

import Navbar from "@/components/commons/navbar"
import Hero from "@/components/landing/hero"
import Experiences from "@/components/landing/experiences"
import Blog from "@/components/landing/blog"
import Projects from "@/components/landing/projects"
import Contacts from "@/components/landing/contacts"

export default function Page() {
  const { setTheme, theme } = useTheme()
  const [isTimelineOpen, setIsTimelineOpen] = React.useState(false)

  return (
    <main className="min-h-screen bg-background">

      {/* Navbar */}
      <Navbar setTheme={setTheme} theme={theme} />

      {/* Hero Section */}
      <Hero />

      {/* Experience Section */}
      <Experiences isTimelineOpen={isTimelineOpen} setIsTimelineOpen={setIsTimelineOpen} />

      {/* Blog Section */}
      {/* <Blog /> */}

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contacts />

    </main>
  )
}

