import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Blog — Calculation Tips, Guides & Tutorials',
  description: 'Learn about finance, math, health, and science calculations with expert guides and tutorials.',
};

const posts = [
  { slug: 'how-bmi-works', title: 'How BMI Works: A Complete Guide', excerpt: 'Understand the Body Mass Index formula, what it measures, its limitations, and how to interpret your results accurately.', category: 'Health', date: '2026-05-15' },
  { slug: 'compound-interest-explained', title: 'Compound Interest Explained: The 8th Wonder of the World', excerpt: 'Learn how compound interest works, the formula behind it, and strategies to maximize your investment growth.', category: 'Finance', date: '2026-05-10' },
  { slug: 'best-sip-strategy', title: 'Best SIP Strategy for 2026', excerpt: 'A comprehensive guide to systematic investment plans, optimal monthly amounts, and fund selection criteria.', category: 'Finance', date: '2026-05-05' },
  { slug: 'understanding-emi', title: 'Understanding EMI: Home Loan vs Personal Loan', excerpt: 'Compare EMI calculations for different loan types, learn amortization schedules, and find the best rates.', category: 'Finance', date: '2026-04-28' },
  { slug: 'calories-vs-macros', title: 'Calories vs Macros: What Actually Matters', excerpt: 'The science behind calorie counting, macro tracking, and which approach works best for your fitness goals.', category: 'Health', date: '2026-04-20' },
  { slug: 'algebra-made-simple', title: 'Algebra Made Simple: From Basics to Advanced', excerpt: 'Master algebraic concepts with step-by-step explanations, visual examples, and practice problems.', category: 'Math', date: '2026-04-15' },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-3">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-12">Expert guides on calculations, formulas, and strategies.</p>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block glass-card p-6 hover:shadow-xl transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">{post.category}</span>
                  <span className="text-[10px] text-gray-400">{post.date}</span>
                </div>
                <h2 className="font-display text-xl font-bold group-hover:text-brand-sapphire transition-colors">{post.title}</h2>
                <p className="text-sm text-gray-500 mt-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

