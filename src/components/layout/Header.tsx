'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import { useSearchStore } from '@/lib/store';
import { CommandPalette } from '@/components/CommandPalette';
import { useLocaleStore } from '@/lib/store';
import { useI18n } from '@/components/LocaleProvider';
import { LOCALES, LOCALE_META, getDictionary } from '@/lib/i18n';

export function Header() {
	const [open, setOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);
	useEffect(() => { if (!langOpen) return; const h = (e: MouseEvent) => { const el = document.querySelector('[data-lang-dropdown]'); if (el && !el.contains(e.target as Node)) setLangOpen(false); }; document.addEventListener('click', h); return () => document.removeEventListener('click', h); }, [langOpen]);
	const { theme, setTheme } = useTheme();
	const openSearch = useSearchStore((s) => s.openSearch);
	const { locale, dict } = useI18n();

	const navLinks = [
		{ label: dict.nav.finance, href: '/category/finance' },
		{ label: dict.nav.health, href: '/category/health' },
		{ label: dict.nav.math, href: '/category/math' },
		{ label: dict.nav.science, href: '/category/science' },
		{ label: dict.nav.engineering, href: '/category/engineering' },
		{ label: dict.nav.converters, href: '/category/conversion' },
		{ label: dict.nav.all, href: '/calculators' },
	];

	return (
		<>
			<CommandPalette />
			<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-14 sm:h-16">
						<Link href="/" className="flex items-center gap-2">
							<Image src="/favicon.svg" alt="Real Calculator 365 logo" width={32} height={32} priority className="w-8 h-8" />
							<span className="font-display font-bold text-base sm:text-lg tracking-tight hidden sm:inline">
								Real Calculator <span className="text-brand-gold">365</span>
							</span>
						</Link>

						<nav className="hidden lg:flex items-center gap-5">
							{navLinks.map((l) => (
								<Link
									key={l.href}
									href={l.href}
									className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-sapphire dark:hover:text-brand-gold transition-colors"
								>
									{l.label}
								</Link>
							))}
						</nav>

						<div className="flex items-center gap-1 sm:gap-2">
							{/* Language dropdown — works on mobile + desktop */}
							<div data-lang-dropdown className="relative group" tabIndex={0}>
								<button
									onClick={() => setLangOpen(!langOpen)}
									className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none"
									aria-label="Select language" aria-expanded="false"
								>
									{LOCALE_META[locale].label}
									<svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
								</button>
								<div className={`absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-1 min-w-[140px] sm:min-w-[160px] z-50 ${langOpen ? "block" : "hidden"}`}>
									{LOCALES.map((code) => {
										const isActive = locale === code;
										const label = LOCALE_META[code].label;
										return (
											<button
												key={code}
												onClick={() => {
													useLocaleStore.getState().setLocale(code);
													window.dispatchEvent(new Event('language-changed'));
									setLangOpen(false);
												}}
												className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'text-brand-gold font-semibold' : 'text-gray-700 dark:text-gray-200'}`}
											>
												{label}
											</button>
										);
									})}
								</div>
							</div>

						{/* Search */}
							<button
								onClick={openSearch}
								className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm text-gray-500"
							>
								<Search className="w-4 h-4" />
								<span className="hidden sm:inline">{dict.nav.search}</span>
								<kbd className="hidden sm:inline ml-2 px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-[10px] font-mono">
									⌘K
								</kbd>
							</button>

							{/* Theme Toggle */}
							<button
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
								className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
								aria-label="Toggle theme"
							>
								<Sun className="w-4 h-4 hidden dark:block text-brand-gold" />
								<Moon className="w-4 h-4 dark:hidden text-brand-indigo" />
							</button>

							{/* Mobile menu */}
							<button
								className="lg:hidden p-2"
								onClick={() => setOpen(!open)}
								aria-label="Menu"
							>
								{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
							</button>
						</div>
					</div>
				</div>

				{open && (
					<nav className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 px-4 py-4 space-y-2 bg-white dark:bg-gray-900">
						{navLinks.map((l) => (
							<Link
								key={l.href}
								href={l.href}
								className="block text-sm font-medium py-2 hover:text-brand-sapphire"
								onClick={() => setOpen(false)}
							>
								{l.label}
							</Link>
						))}
					</nav>
				)}
			</header>
		</>
	);
}
