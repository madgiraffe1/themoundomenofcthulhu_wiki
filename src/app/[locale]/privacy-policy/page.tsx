import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'The Mound: Omen of Cthulhu Wiki privacy policy.',
}

export default function Page() {
  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-5 text-3xl font-bold md:text-4xl">Privacy Policy</h1>
        <div className="space-y-5 text-muted-foreground leading-7">
          <p>This privacy policy explains how The Mound: Omen of Cthulhu Wiki handles basic site usage data.</p>
          <p>The site may use privacy-conscious analytics, advertising tags, or hosting logs when real provider configuration is added. Those integrations are currently controlled through environment variables and provider scripts.</p>
          <p>For privacy questions, contact contact@themoundomenofcthulhu.online.</p>
        </div>
      </div>
    </main>
  )
}
