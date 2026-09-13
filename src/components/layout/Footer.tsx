'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/components/LocaleProvider';

const footerLinkGroups = [
  {
    labelKey: 'finance',
    links: [
      { label: 'EMI Calculator', href: '/emi-calculator' },
      { label: 'SIP Calculator', href: '/sip-calculator' },
      { label: 'Loan Calculator', href: '/loan-calculator' },
      { label: 'Compound Interest', href: '/compound-interest-calculator' },
      { label: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { label: 'ROI Calculator', href: '/roi-calculator' },
    ],
  },
  {
    labelKey: 'health',
    links: [
      { label: 'BMI Calculator', href: '/bmi-calculator' },
      { label: 'Calorie Calculator', href: '/calorie-calculator' },
      { label: 'BMR Calculator', href: '/bmr-calculator' },
      { label: 'TDEE Calculator', href: '/tdee-calculator' },
      { label: 'Body Fat Calculator', href: '/body-fat-calculator' },
    ],
  },
  {
    labelKey: 'math',
    links: [
      { label: 'Scientific Calculator', href: '/scientific-calculator' },
      { label: 'Percentage Calculator', href: '/percentage-calculator' },
      { label: 'Age Calculator', href: '/age-calculator' },
      { label: 'GPA Calculator', href: '/gpa-calculator' },
      { label: 'Algebra Solver', href: '/algebra-solver' },
    ],
  },
  {
    labelKey: 'company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function Footer() {
  const { dict } = useI18n();

  const headings: Record<string, string> = {
    finance: dict.categoryLabels.finance,
    health: dict.categoryLabels.health,
    math: `${dict.categoryLabels.math} & ${dict.categoryLabels.science}`,
    company: dict.footer.company,
  };

  return (
    <footer className="bg-brand-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinkGroups.map((group) => (
            <div key={group.labelKey}>
              <h3 className="font-display font-semibold text-sm text-brand-gold mb-4">{headings[group.labelKey]}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/favicon.svg" alt="Real Calculator 365 logo" width={20} height={20} className="w-5 h-5" />
            <span className="font-display font-bold text-sm">Real Calculator 365</span>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Real Calculator 365. {dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
