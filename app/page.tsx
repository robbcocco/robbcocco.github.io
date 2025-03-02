"use client"

import * as React from "react"

import Navbar from "@/components/commons/navbar"
import Hero from "@/components/landing/hero"
import Experiences from "@/components/landing/experiences"
import Entries from "@/components/landing/entries"
import Projects from "@/components/landing/projects"
import Contacts from "@/components/landing/contacts"

export default function Page() {
  const homepage = [Hero, Entries, Experiences, Projects, Contacts]

  return (
    <main className="min-h-screen bg-background">

      {/* Navbar */}
      <Navbar />

      {
        homepage.map((Component, index) => (
          <Component key={index} background={index%2 === 0 ? "bg-background" : "bg-muted"} />
        ))
      }

    </main>
  )
}

