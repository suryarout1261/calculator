'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/components/LocaleProvider';

const faqs = [
  { q: 'What is Real Calculator 365?', a: 'Real Calculator 365 is the ultimate calculation operating system — a modern platform with 120+ calculators for finance, health, science, engineering, business, and everyday life. No sign-in, no premium, no hassle — all handled by ads.' },
  { q: 'Are the calculators free to use?', a: 'Yes! All 120+ calculators are completely free forever. No premium tiers, no hidden fees, no sign-in required. We show ads to keep everything free.' },
  { q: 'How accurate are the calculations?', a: 'We use scientifically validated formulas with up to 15 decimal places of precision. Our formulas are reviewed by domain experts.' },
  { q: 'Can I use this on mobile?', a: 'Absolutely. Real Calculator 365 is mobile-first and works perfectly on all devices — phones, tablets, and desktops.' },
  { q: 'Do I need to create an account?', a: 'No account required! Just visit any calculator and start using it immediately. All features are accessible without sign-in.' },
  { q: 'Is my data secure?', a: 'Yes. We don\'t store personal calculation data. All computations happen client-side or in encrypted server sessions.' },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { dict } = useI18n();

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">{dict.faq.title}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}

