import Link from 'next/link';
import { Calculator } from 'lucide-react';

const footerLinks = {
  'Finance': [
    { label: 'EMI Calculator', href: '/emi-calculator' },
    { label: 'SIP Calculator', href: '/sip-calculator' },
    { label: 'Loan Calculator', href: '/loan-calculator' },
    { label: 'Compound Interest', href: '/compound-interest-calculator' },
    { label: 'Mortgage Calculator', href: '/mortgage-calculator' },
    { label: 'ROI Calculator', href: '/roi-calculator' },
  ],
  'Health & Fitness': [
    { label: 'BMI Calculator', href: '/bmi-calculator' },
    { label: 'Calorie Calculator', href: '/calorie-calculator' },
    { label: 'BMR Calculator', href: '/bmr-calculator' },
    { label: 'TDEE Calculator', href: '/tdee-calculator' },
    { label: 'Body Fat Calculator', href: '/body-fat-calculator' },
  ],
  'Math & Science': [
    { label: 'Scientific Calculator', href: '/scientific-calculator' },
    { label: 'Percentage Calculator', href: '/percentage-calculator' },
    { label: 'Age Calculator', href: '/age-calculator' },
    { label: 'GPA Calculator', href: '/gpa-calculator' },
    { label: 'Algebra Solver', href: '/algebra-solver' },
  ],
  'Company': [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-sm text-brand-gold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
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
            <Calculator className="w-5 h-5 text-brand-gold" />
            <span className="font-display font-bold text-sm">SHIVARKAA CALCULATE</span>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Shivarkaa. All rights reserved. The Ultimate Calculation Operating System.</p>
        </div>
      </div>
    </footer>
  );
}

