import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About The Mound: Omen of Cthulhu Wiki',
  description: 'The Mound: Omen of Cthulhu Wiki is an unofficial fan guide hub for The Mound: Omen of Cthulhu.',
}

export default function Page() {
  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-5 text-3xl font-bold md:text-4xl">About The Mound: Omen of Cthulhu Wiki</h1>
        <div className="space-y-5 text-muted-foreground leading-7">
          <p>The Mound: Omen of Cthulhu Wiki is an unofficial fan guide hub built to organize practical, source-aware information for The Mound: Omen of Cthulhu.</p>
          <p>The site focuses on release status, co-op basics, survival planning, official video updates, and guide planning without unsupported claims.</p>
          <p>This site is not affiliated with ACE Team, Nacon, Steam, or Valve.</p>
        </div>
      </div>
    </main>
  )
}
