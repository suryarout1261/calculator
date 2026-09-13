import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText, Scale, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">Effective date: August 2026 · By using Real Calculator 365, you agree to these terms.</p>

          <div className="space-y-8">
            {[
              { icon: <FileText className="w-5 h-5" />, title: 'Use of Service', body: 'You may use Real Calculator 365 for personal, educational, and professional calculation needs. You may not use automated scraping or attempt to reverse-engineer the calculation formulas for competitive reproduction. All results are provided for reference only; we do not guarantee accuracy for critical financial, medical, or engineering decisions.' },
              { icon: <Scale className="w-5 h-5" />, title: 'Intellectual Property', body: 'Calculator designs, interaction patterns, branding, and code architecture are the property of Real Calculator 365. You may share links and embed calculators where permitted, but you may not claim ownership of the UI system or redistribute the source as your own product.' },
              { icon: <CheckCircle className="w-5 h-5" />, title: 'No Warranty', body: 'The site and all calculators are provided as-is. We make no representations about uninterrupted availability, and we are not liable for decisions made using our tools. Always verify important calculations with a qualified professional.' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-sapphire/10 text-brand-sapphire flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <h2 className="font-display font-bold text-gray-900 dark:text-white mb-1">{item.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
