import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Calculator, Shield, Zap, Globe, Users, Sparkles } from 'lucide-react';
import { getDictionary, LOCALE_META } from '@/lib/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: getDictionary('en').pages.about.title,
  description: getDictionary('en').pages.about.subtitle,
};

export default function AboutPage() {
  const dict = getDictionary('en');
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-4">About Real Calculator 365</h1>
          <p className="text-gray-700 dark:text-gray-300 leading-7 mb-8 text-lg">
            Real Calculator 365 is a modern calculation operating system built for finance, health, science, engineering,
            education, and everyday decision-making. No sign-in, no premium tier, no hidden fees — all handled by ads.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: <Calculator className="w-5 h-5 text-brand-sapphire" />, title: '120+ Calculators', desc: 'From EMI and BMI to scientific, matrix, and AI-powered solvers — all in one place.' },
              { icon: <Zap className="w-5 h-5 text-amber-500" />, title: 'Instant Results', desc: 'Live calculation with zero clicks. Drag, toggle, and watch values update in real time.' },
              { icon: <Shield className="w-5 h-5 text-emerald-500" />, title: 'Privacy First', desc: 'We never ask for accounts. Your data stays in your browser — no tracking, no data selling.' },
              { icon: <Globe className="w-5 h-5 text-rose-500" />, title: 'Global Access', desc: 'Works in every language, every device, every connection. Built for everyone, everywhere.' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center">{item.icon}</div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 mb-6">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              Reliable calculations should be fast, understandable, visual, and accessible to everyone globally.
              We believe premium UX and scalable architecture should not come behind a paywall — they are the baseline.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              Every calculator on Real Calculator 365 is engineered for accuracy, tested against standard formulas, and
              redesigned continuously for smoother interactions. Whether you are a student solving trigonometry,
              a professional modeling retirement, or someone checking their BMI before a workout — the experience
              should feel effortless.
            </p>
          </div>

          <div className="glass-card p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">How It Works</h2>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              {[
                'No account required — open any calculator and start instantly.',
                'Results compute live as you type, drag, or select options.',
                'History and favorites save locally in your browser for convenience.',
                'All calculators are free forever; no feature locks or hidden tiers.',
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-sapphire/10 text-brand-sapphire text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="leading-6">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
