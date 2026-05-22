# SHIVARKAA CALCULATE

> The Ultimate Calculation Operating System

A production-grade, SEO-optimized calculator platform with 120+ calculators across finance, health, math, science, engineering, and more.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Icons:** Lucide React
- **Hosting:** Vercel / Docker

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm start
```

## Docker Deployment

```bash
docker build -t shivarkaa-calculate .
docker run -p 3000:3000 shivarkaa-calculate
```

## Deploy to Vercel

```bash
npx vercel --prod
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # Robots.txt
│   ├── calculators/              # All calculators listing
│   ├── bmi-calculator/           # BMI calculator page
│   ├── emi-calculator/           # EMI calculator page
│   ├── sip-calculator/           # SIP calculator page
│   ├── compound-interest-calculator/
│   ├── percentage-calculator/
│   ├── age-calculator/
│   ├── scientific-calculator/
│   ├── calorie-calculator/
│   ├── loan-calculator/
│   └── gpa-calculator/
├── components/
│   ├── layout/                   # Header, Footer
│   ├── home/                     # Homepage sections
│   └── calculators/              # Calculator components
└── globals.css                   # Tailwind + custom styles
```

## Implemented Calculators

### Priority (Top 10 SEO)
1. ✅ BMI Calculator
2. ✅ EMI Calculator
3. ✅ SIP Calculator
4. ✅ Compound Interest Calculator
5. ✅ Percentage Calculator
6. ✅ Age Calculator
7. ✅ Scientific Calculator
8. ✅ Calorie Calculator
9. ✅ GPA Calculator
10. ✅ Loan Calculator

## SEO Features

- Dynamic metadata per page
- JSON-LD structured data (FAQ, WebApplication schemas)
- Automatic sitemap.xml generation
- robots.txt
- Semantic HTML with breadcrumbs
- Canonical URLs
- Static pre-rendering for instant load

## Extending

To add a new calculator:

1. Create `src/components/calculators/YourCalculator.tsx` (client component)
2. Create `src/app/your-calculator/page.tsx` with metadata
3. Add to sitemap in `src/app/sitemap.ts`
4. Add to footer links and category pages

## Future Roadmap

- [ ] Dark mode toggle
- [ ] AI-powered equation solver (FastAPI backend)
- [ ] User accounts & saved calculations
- [ ] PostgreSQL + Prisma for data persistence
- [ ] Redis caching layer
- [ ] Blog/CMS system
- [ ] Admin panel
- [ ] Multilingual support
- [ ] Mobile apps (React Native)
- [ ] Premium subscription tier

## License

Proprietary © Shivarkaa

