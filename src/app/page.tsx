import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { PopularCalculators } from '@/components/home/PopularCalculators';
import { AIFeatures } from '@/components/home/AIFeatures';
import { TrustSection } from '@/components/home/TrustSection';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <PopularCalculators />
        <AIFeatures />
        <TrustSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

