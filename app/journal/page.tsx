import Link from "next/link"
import NavbarLite from "@/components/commons/navbar-lite"
import { latest } from "@/data/latest"

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <NavbarLite />

      {/* Content */}
      <div className="mx-auto max-w-[800px] px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Journal</h1>
        {/* <p className="mt-4 text-lg text-muted-foreground">
          Thoughts, ideas, and insights about web development, design, and technology.
        </p> */}

        <div className="mt-12 space-y-8">
          {latest.map((post, index) => (
            <article key={index} className="group">
              <Link href={`/journal/${post.slug}`} className="block space-y-3">
                <div className="text-sm text-muted-foreground">{post.date}</div>
                <h2 className="text-xl font-medium group-hover:text-primary">{post.title}</h2>
                <p className="text-muted-foreground">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

