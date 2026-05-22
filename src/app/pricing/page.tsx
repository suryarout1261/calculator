'use client';

import { motion } from 'framer-motion';
import { Check, Crown, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      { text: '10 calculations/day', included: true },
      { text: 'Basic calculators', included: true },
      { text: 'Ad-supported', included: true },
      { text: 'AI features', included: false },
      { text: 'Export to PDF/CSV', included: false },
      { text: 'Advanced charts', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$9',
    period: '/month',
    features: [
      { text: 'Unlimited calculations', included: true },
      { text: 'All calculators unlocked', included: true },
      { text: 'No ads', included: true },
      { text: 'AI-powered features', included: true },
      { text: 'Export to PDF/CSV', included: true },
      { text: 'Advanced charts & reports', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Upgrade Now',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    features: [
      { text: 'Everything in Premium', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Custom branding', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom calculators', included: true },
      { text: 'SLA guarantee', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const { user, upgradeToPremium } = useAuthStore();
  const router = useRouter();

  const handleUpgrade = (plan: string) => {
    if (!user) { router.push('/login'); return; }
    if (plan === 'Premium') {
      // In production, this would redirect to Stripe Checkout
      upgradeToPremium();
      toast.success('🎉 Upgraded to Premium! Enjoy unlimited access.');
      router.push('/dashboard');
    } else if (plan === 'Enterprise') {
      toast('Enterprise plan — contact sales@shivarkaa.com');
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your needs. Upgrade anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 border ${plan.popular ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10 shadow-xl relative' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-gold text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" /> MOST POPULAR
                  </span>
                )}
                <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2 text-sm">
                      {f.included ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-gray-300" />}
                      <span className={f.included ? '' : 'text-gray-400'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade(plan.name)}
                  disabled={plan.name === 'Free' || (user?.isPremium && plan.name === 'Premium')}
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                    plan.popular ? 'bg-brand-gold text-white hover:bg-brand-gold/90 shadow-lg' :
                    'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {user?.isPremium && plan.name === 'Premium' ? '✓ Active' : plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

