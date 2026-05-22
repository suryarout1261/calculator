'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Calculator, Search, Moon, Sun, User, LogOut, Crown, Settings } from 'lucide-react';
import { useSearchStore, useAuthStore } from '@/lib/store';
import { CommandPalette } from '@/components/CommandPalette';

const navLinks = [
	{ label: 'Finance', href: '/category/finance' },
	{ label: 'Health', href: '/category/health' },
	{ label: 'Math', href: '/category/math' },
	{ label: 'Science', href: '/category/science' },
	{ label: 'Engineering', href: '/category/engineering' },
	{ label: 'Converters', href: '/category/conversion' },
	{ label: 'AI Tools', href: '/category/ai' },
];

export function Header() {
	const [open, setOpen] = useState(false);
	const [userMenu, setUserMenu] = useState(false);
	const { theme, setTheme } = useTheme();
	const openSearch = useSearchStore((s) => s.openSearch);
	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);

	return (
		<>
			<CommandPalette />
			<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<Link href="/" className="flex items-center gap-2">
							<Calculator className="w-7 h-7 text-brand-gold" />
							<span className="font-display font-bold text-lg tracking-tight">
								SHIVARKAA<span className="text-brand-gold ml-1">CALCULATE</span>
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

						<div className="flex items-center gap-2">
							{/* Search */}
							<button
								onClick={openSearch}
								className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm text-gray-500"
							>
								<Search className="w-4 h-4" />
								<span className="hidden sm:inline">Search</span>
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

							{/* Auth */}
							{user ? (
								<div className="relative">
									<button
										onClick={() => setUserMenu(!userMenu)}
										className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
									>
										<div className="w-7 h-7 rounded-full bg-brand-sapphire flex items-center justify-center text-white text-xs font-bold">
											{user.name[0].toUpperCase()}
										</div>
										{user.isPremium && (
											<Crown className="w-3.5 h-3.5 text-brand-gold" />
										)}
									</button>
									{userMenu && (
										<div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
											<div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
												<p className="text-sm font-medium truncate">{user.name}</p>
												<p className="text-xs text-gray-500 truncate">
													{user.email}
												</p>
												{user.isPremium && (
													<span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-brand-gold">
														<Crown className="w-3 h-3" />
														PREMIUM
													</span>
												)}
											</div>
											<Link
												href="/dashboard"
												onClick={() => setUserMenu(false)}
												className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
											>
												<User className="w-4 h-4" />
												Dashboard
											</Link>
											<Link
												href="/settings"
												onClick={() => setUserMenu(false)}
												className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
											>
												<Settings className="w-4 h-4" />
												Account Settings
											</Link>
											{!user.isPremium && (
												<Link
													href="/pricing"
													onClick={() => setUserMenu(false)}
													className="flex items-center gap-2 px-4 py-2 text-sm text-brand-gold hover:bg-gray-50 dark:hover:bg-gray-800"
												>
													<Crown className="w-4 h-4" />
													Upgrade to Premium
												</Link>
											)}
											<button
												onClick={() => {
													logout();
													setUserMenu(false);
												}}
												className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800"
											>
												<LogOut className="w-4 h-4" />
												Logout
											</button>
										</div>
									)}
								</div>
							) : (
								<Link href="/login" className="btn-primary py-2 px-4 text-xs">
									Sign In
								</Link>
							)}

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


