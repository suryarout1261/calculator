import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">Effective date: August 2026 · Last updated: August 2026</p>

          <div className="space-y-8">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, title: 'What We Collect', body: 'We collect nothing personally identifiable. No account creation, no email collection unless you send a message through our contact form. Calculation values are computed entirely in your browser via JavaScript and never transmitted to a server.' },
              { icon: <Lock className="w-5 h-5" />, title: 'Local Storage', body: 'Favorites, history, theme preference, and recent searches are stored locally using browser storage (localStorage / IndexedDB). You can clear them anytime from your browser settings without affecting anything else.' },
              { icon: <Eye className="w-5 h-5" />, title: 'Analytics', body: 'We may use privacy-first analytics to understand which calculators are most used. No individual tracking, no cookies that persist beyond session needs, and no sale of usage data to third parties.' },
              { icon: <Database className="w-5 h-5" />, title: 'Third Parties', body: 'We do not embed third-party tracking scripts. Ad content may come from partner networks, but those networks do not have access to your calculator inputs or results.' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-sapphire/10 text-brand-sapphire flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <h2 className="font-display font-bold text-gray-900 dark:text-white mb-1">{item.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}

            <div className="glass-card p-6">
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-2">Your Rights</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Since we do not hold personal data, there is no request to delete or export beyond clearing your local browser storage. If you have questions about data handling, contact us at support@realcalculator365.com.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
