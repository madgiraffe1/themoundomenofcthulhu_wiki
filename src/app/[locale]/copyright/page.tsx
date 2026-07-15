import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Copyright',
  description: 'The Mound: Omen of Cthulhu Wiki copyright information.',
}

export default function Page() {
  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-5 text-3xl font-bold md:text-4xl">Copyright</h1>
        <div className="space-y-5 text-muted-foreground leading-7">
          <p>The Mound: Omen of Cthulhu and related official assets belong to their respective owners.</p>
          <p>The Mound: Omen of Cthulhu Wiki uses game-identifying references only to describe the fan guide topic and link users to official sources.</p>
          <p>For copyright or takedown requests, contact copyright@themoundomenofcthulhu.online.</p>
        </div>
      </div>
    </main>
  )
}
