import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from './ContactForm';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Contact</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
            Questions, feedback, partnerships, feature requests, or enterprise calculators? We read everything.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'support@realcalculator365.com', desc: 'General questions & feedback', href: 'mailto:support@realcalculator365.com' },
              { icon: <MessageSquare className="w-5 h-5" />, label: 'Business', value: 'partnerships@realcalculator365.com', desc: 'Enterprise & partnerships', href: 'mailto:partnerships@realcalculator365.com' },
              { icon: <Clock className="w-5 h-5" />, label: 'Response', value: '1–2 business days', desc: 'We reply quickly', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="glass-card p-5 hover:shadow-xl transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-sapphire/10 text-brand-sapphire flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm">{item.label}</h3>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{item.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
              </a>
            ))}
          </div>

          <div className="glass-card p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Send a message</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">This opens your default email client with a pre-filled message so you can reach us instantly.</p>
            <ContactForm />
          </div>

          <div className="glass-card p-6 mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5 text-brand-sapphire shrink-0" />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Headquarters</p>
              <p>Real Calculator 365 Labs · Remote-first across EU & APAC · No physical office required</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
