"use client";

import { useMessages } from "next-intl";
import { ArrowRight, BookOpen, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { VideoFeature } from "@/components/home/VideoFeature";
import { AdBanner, NativeBannerAd } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient(_props: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.themoundomenofcthulhu.online";
  const mobileBannerAd = getPreferredMobileBannerSelection();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: t.site.name, description: t.site.description },
      { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: t.site.name, url: siteUrl, logo: `${siteUrl}/android-chrome-512x512.png` },
      { "@type": "VideoGame", name: t.site.game, gamePlatform: t.site.platform, applicationCategory: "Game", url: t.site.officialUrl },
      { "@type": "VideoObject", name: t.video.title, thumbnailUrl: `https://i.ytimg.com/vi/${t.video.id}/hqdefault.jpg`, embedUrl: `https://www.youtube.com/embed/${t.video.id}`, url: `https://www.youtube.com/watch?v=${t.video.id}` }
    ]
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative overflow-hidden px-4 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--nav-theme)/0.22),transparent_34%),linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent_64%)]" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                {t.hero.badge}
              </div>
              <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">{t.hero.title}</h1>
              <p className="mb-8 max-w-3xl text-base leading-7 text-muted-foreground md:text-xl">{t.hero.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {t.hero.ctas.map((cta: any, index: number) => cta.href.startsWith("http") ? (
                  <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className={index === 0 ? "inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--nav-theme))] px-6 py-3 font-semibold text-white transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)]" : "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold transition-colors hover:bg-white/10"}>
                    {index === 0 ? <ExternalLink className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                    {cta.label}
                  </a>
                ) : (
                  <a key={cta.label} href={cta.href} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold transition-colors hover:bg-white/10">
                    <BookOpen className="h-5 w-5" />
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card/75 p-4 shadow-2xl">
              <img src="/images/hero.webp" alt={t.hero.title} className="aspect-[16/10] w-full rounded-md object-cover" />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                {t.hero.stats.map((stat: any) => (
                  <div key={stat.label} className="rounded-md bg-white/5 px-3 py-3">
                    <div className="text-base font-bold text-[hsl(var(--nav-theme-light))]">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-10 md:py-12">
        <VideoFeature videoId={t.video.id} title={t.video.title} />
      </section>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">Start Here</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">{t.home.startTitle}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.home.start.map((card: any, index: number) => (
            <article key={card.title} className="rounded-lg border border-border bg-card p-5">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[hsl(var(--nav-theme)/0.16)] text-sm font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</div>
              <h3 className="mb-2 font-semibold leading-snug">{card.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">Guide Modules</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">{t.home.modulesTitle}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{t.home.modulesDescription}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {t.home.modules.map((mod: any) => (
            <article key={mod.id} id={mod.id} className="rounded-lg border border-border bg-card p-5 scroll-mt-24">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-semibold leading-snug">{mod.name}</h3>
                <span className="rounded-full bg-[hsl(var(--nav-theme)/0.14)] px-2.5 py-1 text-xs text-[hsl(var(--nav-theme-light))]">{mod.displayType}</span>
              </div>
              <p className="mb-4 text-sm leading-6 text-muted-foreground">{mod.description}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {mod.highlights.map((item: any) => (
                  <div key={item.label + item.detail} className="rounded-md bg-white/[0.04] px-3 py-2 text-sm">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-muted-foreground">{item.detail}</div>
                    {item.badge && <div className="mt-1 text-xs text-[hsl(var(--nav-theme-light))]">{item.badge}</div>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">About</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">{t.home.aboutTitle}</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            {t.home.about.map((paragraph: string) => <p key={paragraph} className="leading-7">{paragraph}</p>)}
            <div className="grid gap-3 sm:grid-cols-2">
              {t.home.facts.map((fact: any) => (
                <div key={fact.label} className="rounded-md border border-border bg-card p-4">
                  <div className="text-xs uppercase text-muted-foreground">{fact.label}</div>
                  <div className="mt-1 font-semibold text-foreground">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-7 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-[hsl(var(--nav-theme-light))]" />
          <h2 className="text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {t.home.faq.map((item: any) => (
            <article key={item.question} className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold">{item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
