'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is SHIVARKAA CALCULATE?', a: 'SHIVARKAA CALCULATE is the ultimate calculation operating system — a modern, AI-powered platform with 120+ calculators for finance, health, science, engineering, business, and everyday life.' },
  { q: 'Are the calculators free to use?', a: 'Yes! All standard calculators are completely free. Premium AI-powered features and advanced tools are available with a subscription.' },
  { q: 'How accurate are the calculations?', a: 'We use scientifically validated formulas with up to 15 decimal places of precision. Our formulas are reviewed by domain experts.' },
  { q: 'Can I use this on mobile?', a: 'Absolutely. SHIVARKAA CALCULATE is mobile-first and works perfectly on all devices — phones, tablets, and desktops.' },
  { q: 'What AI features are available?', a: 'Our AI can solve equations step-by-step, explain formulas in plain language, provide financial insights, recommend fitness plans, and tutor you in math.' },
  { q: 'Is my data secure?', a: 'Yes. We don\'t store personal calculation data. All computations happen client-side or in encrypted server sessions.' },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
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

