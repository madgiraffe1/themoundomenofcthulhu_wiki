import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The Mound: Omen of Cthulhu Wiki terms of service.',
}

export default function Page() {
  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-5 text-3xl font-bold md:text-4xl">Terms of Service</h1>
        <div className="space-y-5 text-muted-foreground leading-7">
          <p>By using The Mound: Omen of Cthulhu Wiki, you agree to use the site as an informational fan guide resource for The Mound: Omen of Cthulhu.</p>
          <p>Do not use the site to submit unlawful content, exploit instructions, abusive automation, or misleading official-claim material.</p>
          <p>All game names, platform names, and related marks belong to their respective owners. This site is unofficial and may change or remove content as source information changes.</p>
        </div>
      </div>
    </main>
  )
}
