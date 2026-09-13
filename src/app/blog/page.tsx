import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, Sparkles } from 'lucide-react';

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">Notes on calculators, design, and making math feel easy.</p>

          <div className="space-y-6">
            {[
              {
                title: 'Why We Removed the Calculate Button',
                date: 'Aug 2026',
                excerpt: 'Real-time calculation eliminates friction. When users drag a slider, they should see the answer immediately — not after a second click. We rebuilt BMI, Body Fat, and 50+ calculators on this principle.',
                tag: 'Product',
              },
              {
                title: 'Designing Apple-Style Range Sliders for the Web',
                date: 'Jul 2026',
                excerpt: 'Draggable thumbs, spring physics, and smooth bubble tooltips sound simple until you try to make them feel native on both mouse and touch. Here is how we tuned stiffness and damping for a premium feel.',
                tag: 'Engineering',
              },
              {
                title: 'Making Calculators Accessible to Everyone',
                date: 'Jun 2026',
                excerpt: 'No account, no premium, no region lock. We redesigned the entire architecture around local storage and server-side rendering so the app works offline, in dark mode, and in every browser.',
                tag: 'Accessibility',
              },
            ].map((post) => (
              <article key={post.title} className="glass-card p-6 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-sapphire bg-brand-sapphire/10 px-2 py-0.5 rounded-full">{post.tag}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-sapphire hover:text-blue-700 mt-3 transition">Read more <BookOpen className="w-3.5 h-3.5" /></a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
