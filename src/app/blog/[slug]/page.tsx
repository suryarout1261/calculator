import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

const blogContent: Record<string, { title: string; category: string; content: string }> = {
  'how-bmi-works': {
    title: 'How BMI Works: A Complete Guide',
    category: 'Health',
    content: `## What is BMI?\n\nBody Mass Index (BMI) is a numerical value calculated from a person's weight and height. It provides a simple screening method to categorize individuals into weight status categories.\n\n## The Formula\n\n**Metric:** BMI = weight (kg) / height² (m²)\n\n**Imperial:** BMI = (weight (lbs) / height² (in²)) × 703\n\n## BMI Categories\n\n- **Underweight:** < 18.5\n- **Normal weight:** 18.5 – 24.9\n- **Overweight:** 25 – 29.9\n- **Obese:** ≥ 30\n\n## Limitations\n\nBMI doesn't distinguish between muscle and fat mass, doesn't account for age, sex, ethnicity, or body composition. Athletes may have high BMI due to muscle mass.\n\n## When to Use BMI\n\nBMI is best used as a population-level screening tool. For individual health assessments, combine BMI with waist circumference, body fat percentage, and clinical evaluation.`,
  },
  'compound-interest-explained': {
    title: 'Compound Interest Explained',
    category: 'Finance',
    content: `## The Power of Compounding\n\nCompound interest is interest calculated on the initial principal and also on the accumulated interest from previous periods.\n\n## Formula\n\n**A = P(1 + r/n)^(nt)**\n\nWhere:\n- A = final amount\n- P = principal\n- r = annual interest rate (decimal)\n- n = number of times compounded per year\n- t = time in years\n\n## Example\n\n₹1,00,000 at 8% compounded monthly for 10 years:\nA = 1,00,000 × (1 + 0.08/12)^(12×10) = ₹2,21,964\n\n## Key Takeaways\n\n1. Start early — time is the most powerful factor\n2. Higher frequency = slightly more returns\n3. Even small differences in rate compound significantly over time`,
  },
};

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link href="/blog" className="text-brand-sapphire mt-4 inline-block">← Back to Blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-brand-sapphire">Home</Link> / <Link href="/blog" className="hover:text-brand-sapphire">Blog</Link> / <span>{post.title}</span>
          </nav>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">{post.category}</span>
          <h1 className="font-display text-4xl font-bold mt-2 mb-8">{post.title}</h1>
          <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
            {post.content}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}


