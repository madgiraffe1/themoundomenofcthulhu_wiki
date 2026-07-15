'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ExternalLink } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { NavPreviewData } from '@/types/nav-preview'

interface NavigationProps {
	navPreviewData?: NavPreviewData
}

export default function Navigation(_props: NavigationProps) {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/84 backdrop-blur-lg">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<Link href="/" className="flex min-w-0 items-center gap-3 hover:opacity-85 transition">
					<Image src="/android-chrome-192x192.png" alt="The Mound: Omen of Cthulhu icon" width={40} height={40} className="h-10 w-10 rounded-lg object-cover" priority />
					<span className="truncate text-sm font-bold sm:text-lg">The Mound: Omen of Cthulhu</span>
				</Link>
				<div className="flex items-center gap-3">
					<a href="https://store.steampowered.com/app/2569760/The_Mound_Omen_of_Cthulhu/" target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-white/10 sm:inline-flex">
						Steam
						<ExternalLink className="h-4 w-4" />
					</a>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	)
}
