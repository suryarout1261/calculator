// ============ I18N CONFIGURATION ============
// Supported locales. 'en' is the default (no URL prefix).

export const LOCALES = ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const BASE_URL = 'https://realcalculator365.com';

interface LocaleMeta {
  code: Locale;
  label: string;        // native name shown in the header switcher
  htmlLang: string;     // <html lang> / hreflang value
  ogLocale: string;     // Open Graph locale
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: 'en', label: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  es: { code: 'es', label: 'Español', htmlLang: 'es', ogLocale: 'es_ES' },
  ja: { code: 'ja', label: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP' },
  fr: { code: 'fr', label: 'Français', htmlLang: 'fr', ogLocale: 'fr_FR' },
  de: { code: 'de', label: 'Deutsch', htmlLang: 'de', ogLocale: 'de_DE' },
  pt: { code: 'pt', label: 'Português', htmlLang: 'pt', ogLocale: 'pt_PT' },
  ko: { code: 'ko', label: '한국어', htmlLang: 'ko', ogLocale: 'ko_KR' },
  it: { code: 'it', label: 'Italiano', htmlLang: 'it', ogLocale: 'it_IT' },
};

// Derive the locale from a URL pathname ('' | '/' → 'en', '/es/...' → 'es').
export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(first) ? (first as Locale) : DEFAULT_LOCALE;
}

// Prefix a path with a locale ('/calculators', 'es' → '/es/calculators').
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

// hreflang alternates map for a given page path (e.g. '/' or '/bmi-calculator').
export function hreflangAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  LOCALES.forEach((locale) => {
    alternates[LOCALE_META[locale].htmlLang] = `${BASE_URL}${localePath(locale, path)}`;
  });
  alternates['x-default'] = `${BASE_URL}${localePath(DEFAULT_LOCALE, path)}`;
  return alternates;
}

// ============ DICTIONARIES ============
// Homepage + chrome strings per locale. Long-form content (calculator
// descriptions, FAQ answers, AI feature blurbs) stays English until
// translations are supplied — extend these objects to cover it.

export interface Dictionary {
  metaTitle: string;
  metaDescription: string;
  nav: { finance: string; health: string; math: string; science: string; engineering: string; converters: string; all: string; search: string };
  hero: { badge: string; titleA: string; titleB: string; subtitle: string; searchPlaceholder: string; cta: string };
  categories: { title: string; subtitle: string; tools: string };
  categoryLabels: Record<string, string>;
  popular: { title: string; subtitle: string; viewAll: string };
  ai: { badge: string; title: string; subtitle: string };
  trust: { title: string; subtitle: string };
  faq: { title: string };
  footer: { copyright: string; company: string };
  // Calculator labels and UI strings
  calculators: Record<string, {
    label: string;
    description: string;
    unit?: string;
    button: string;
    result: Record<string, string>;
    inputs: Record<string, string>;
  }>;
  // Calculator-specific translations added by Phase 1
  // Static page content
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: string; subtitle: string; mission: string; howItWorks: string; noAccount: string; instantResults: string; privacyFirst: string; globalAccess: string };
    contact: { title: string; subtitle: string; emailLabel: string; businessLabel: string; responseLabel: string; sendMessage: string; headquarters: string };
    privacy: { title: string; effectiveDate: string; whatWeCollect: string; localStorage: string; analytics: string; thirdParties: string; yourRights: string };
    terms: { title: string; effectiveDate: string; useOfService: string; ip: string; noWarranty: string };
    blog: { title: string; subtitle: string; readMore: string; tagProduct: string; tagEngineering: string; tagAccessibility: string };
    pricing: { title: string; subtitle: string; allCategories: string; faq: { title: string }; freeForever: string; noSignIn: string };
  };
}

// ============ CALCULATOR LABELS (English base) ============
// These are used as fallbacks and in the CALCULATORS registry.
const calcLabels: Record<string, { label: string; description: string }> = {
  'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' },
  'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' },
  'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' },
  'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' },
  'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' },
  'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' },
  'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' },
  'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' },
  'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' },
  'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' },
  'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' },
  'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' },
  'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' },
  'currency': { label: 'Currency Converter', description: 'Convert between world currencies' },
  'credit-card': { label: 'Credit Card Payoff Calculator', description: 'Plan credit card debt payoff' },
  'break-even': { label: 'Break-even Calculator', description: 'Find business break-even point' },
  'investment-return': { label: 'Investment Return Calculator', description: 'Calculate total investment returns' },
  'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' },
  'bmr': { label: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
  'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' },
  'body-fat': { label: 'Body Fat Calculator', description: 'Estimate body fat percentage' },
  'water-intake': { label: 'Water Intake Calculator', description: 'Calculate daily water needs' },
  'protein': { label: 'Protein Calculator', description: 'Calculate daily protein needs' },
  'tdee': { label: 'TDEE Calculator', description: 'Total Daily Energy Expenditure' },
  'ideal-weight': { label: 'Ideal Weight Calculator', description: 'Find your ideal body weight' },
  'pregnancy': { label: 'Pregnancy Calculator', description: 'Calculate due date & milestones' },
  'heart-rate': { label: 'Heart Rate Zone Calculator', description: 'Find your target heart rate zones' },
  'macro': { label: 'Macro Calculator', description: 'Calculate daily macronutrient split' },
  'sleep-cycle': { label: 'Sleep Cycle Calculator', description: 'Optimize your sleep schedule' },
  'period-tracker': { label: 'Period Tracker', description: 'Track cycle, predict periods & fertility' },
  'ovulation': { label: 'Ovulation Calculator', description: 'Predict ovulation & fertility window' },
  'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' },
  'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' },
  'fraction': { label: 'Fraction Calculator', description: 'Add, subtract, multiply fractions' },
  'algebra': { label: 'Algebra Solver', description: 'Solve algebraic equations' },
  'matrix': { label: 'Matrix Calculator', description: 'Matrix operations & determinants' },
  'probability': { label: 'Probability Calculator', description: 'Calculate probabilities' },
  'statistics': { label: 'Statistics Calculator', description: 'Mean, median, mode, std deviation' },
  'geometry': { label: 'Geometry Calculator', description: 'Area, perimeter, volume of shapes' },
  'trigonometry': { label: 'Trigonometry Calculator', description: 'Sin, cos, tan & triangle solver' },
  'unit-converter': { label: 'Unit Converter', description: 'Convert between units' },
  'force': { label: 'Force Calculator', description: 'Calculate force (F=ma)' },
  'velocity': { label: 'Velocity Calculator', description: 'Calculate speed & velocity' },
  'density': { label: 'Density Calculator', description: 'Calculate mass/volume density' },
  'ohms-law': { label: "Ohm's Law Calculator", description: 'Voltage, current, resistance' },
  'energy': { label: 'Energy Calculator', description: 'Calculate kinetic & potential energy' },
  'pressure': { label: 'Pressure Calculator', description: 'Calculate pressure from force/area' },
  'molarity': { label: 'Molarity Calculator', description: 'Calculate solution concentration' },
  'voltage-drop': { label: 'Voltage Drop Calculator', description: 'Calculate voltage drop in cables' },
  'concrete': { label: 'Concrete Calculator', description: 'Estimate concrete volume needed' },
  'pipe-flow': { label: 'Pipe Flow Calculator', description: 'Calculate flow rate in pipes' },
  'hvac': { label: 'HVAC Calculator', description: 'Calculate heating & cooling loads' },
  'construction': { label: 'Construction Estimator', description: 'Estimate construction materials' },
  'age': { label: 'Age Calculator', description: 'Calculate exact age' },
  'date-difference': { label: 'Date Difference Calculator', description: 'Days between two dates' },
  'working-days': { label: 'Working Days Calculator', description: 'Count business days' },
  'time-zone': { label: 'Time Zone Converter', description: 'Convert time across zones' },
  'gpa': { label: 'GPA Calculator', description: 'Calculate grade point average' },
  'cgpa': { label: 'CGPA Calculator', description: 'Calculate cumulative GPA' },
  'attendance': { label: 'Attendance Calculator', description: 'Track & predict attendance %' },
  'exam-score': { label: 'Exam Score Predictor', description: 'Predict final exam grades' },
  'length': { label: 'Length Converter', description: 'Convert length units' },
  'weight': { label: 'Weight Converter', description: 'Convert weight units' },
  'temperature': { label: 'Temperature Converter', description: 'Convert temperature units' },
  'area': { label: 'Area Converter', description: 'Convert area units' },
  'volume': { label: 'Volume Converter', description: 'Convert volume units' },
  'speed': { label: 'Speed Converter', description: 'Convert speed units' },
  'data-storage': { label: 'Data Storage Converter', description: 'Convert bytes, MB, GB, TB' },
  'depreciation': { label: 'Depreciation Calculator', description: 'Calculate asset depreciation' },
  'payroll': { label: 'Payroll Calculator', description: 'Calculate employee payroll' },
  'revenue-growth': { label: 'Revenue Growth Calculator', description: 'Calculate revenue growth rate' },
  'ebitda': { label: 'EBITDA Calculator', description: 'Calculate EBITDA & margins' },
  'ai-equation': { label: 'AI Equation Solver', description: 'AI-powered equation solving' },
  'ai-finance': { label: 'AI Finance Advisor', description: 'AI financial insights & advice' },
  'ai-health': { label: 'AI Health Insights', description: 'AI-powered health recommendations' },
  'ai-tutor': { label: 'AI Math Tutor', description: 'Interactive AI math tutoring' },
  'ai-budget': { label: 'AI Budget Planner', description: 'Smart budget recommendations' },
  'ai-calorie': { label: 'AI Calorie Planner', description: 'AI-optimized meal calorie planning' },
};

// ============ GENERIC CALCULATOR UI STRINGS ============
// Default result/input strings used when specific translations are missing.
const defaultCalcUI = {
  button: 'Calculate',
  result: {
    'Monthly Payment': 'Monthly Payment',
    'Total Interest': 'Total Interest',
    'Total Amount': 'Total Amount',
    'Your BMI': 'Your BMI',
    'Healthy Range': 'Healthy Range',
    'Invested': 'Invested',
    'Est. Returns': 'Est. Returns',
    'Total Value': 'Total Value',
    'Your GPA': 'Your GPA',
  },
  inputs: {
    'Loan Amount': 'Loan Amount',
    'Interest Rate': 'Interest Rate',
    'Tenure': 'Tenure',
    'Principal Amount': 'Principal Amount',
    'Time Period': 'Time Period',
    'Monthly Investment': 'Monthly Investment',
    'Expected Return Rate': 'Expected Return Rate',
    'Weight': 'Weight',
    'Height': 'Height',
    'Age': 'Age',
    'Gender': 'Gender',
    'Activity Level': 'Activity Level',
  },
};

// ============ ENGLISH DICTIONARY ============
const en: Dictionary = {
  metaTitle: 'Real Calculator 365 — Free Online Calculators for Finance, Health, Math & More',
  metaDescription:
    'No sign-in, no premium, no hassle — all handled by ads. Access 120+ free online calculators for finance, health, science, math, engineering, and more. Fast, accurate, and 100% free forever.',
  nav: { finance: 'Finance', health: 'Health', math: 'Math', science: 'Science', engineering: 'Engineering', converters: 'Converters', all: 'All Calculators', search: 'Search' },
  hero: {
    badge: 'AI-Powered Calculation Engine',
    titleA: 'Calculate Anything.',
    titleB: 'Instantly.',
    subtitle: 'AI-powered calculators and intelligent tools for finance, health, science, engineering, business, and everyday life. Trusted by millions worldwide.',
    searchPlaceholder: 'Search calculators... (e.g., BMI, EMI, Interest)',
    cta: 'Explore All Calculators',
  },
  categories: { title: "Every Calculator You'll Ever Need", subtitle: '120+ precision calculators across {n} categories. Powered by AI and built for speed.', tools: 'tools' },
  categoryLabels: {
    finance: 'Finance', health: 'Health & Fitness', math: 'Math', science: 'Science', engineering: 'Engineering',
    'date-time': 'Date & Time', education: 'Education', conversion: 'Conversion', business: 'Business & Accounting', ai: 'AI Tools',
  },
  popular: { title: 'Most Popular', subtitle: 'Used by millions every day', viewAll: 'View All' },
  ai: { badge: 'Powered by AI', title: 'Smart Calculations. Intelligent Insights.', subtitle: 'Beyond basic math — our AI engine explains, recommends, and teaches.' },
  trust: { title: 'Built for Performance & Trust', subtitle: 'Enterprise-grade infrastructure delivering instant, accurate calculations worldwide.' },
  faq: { title: 'Frequently Asked Questions' },
  footer: { company: 'Company', copyright: 'All rights reserved. No sign-in, no premium, no hassle — all handled by ads.' },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index', button: 'Calculate', result: { 'Your BMI': 'Your BMI', 'Healthy Range': 'Healthy Range' }, inputs: { Weight: 'Weight', Height: 'Height' } },
    'age': { label: 'Age Calculator', description: 'Calculate exact age', button: 'Calculate Age', result: { 'Years': 'Years', 'Months': 'Months', 'Days': 'Days', 'Total Days': 'Total Days' }, inputs: { 'Date of Birth': 'Date of Birth' } },
    'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest', button: 'Calculate', result: { 'Monthly Payment': 'Monthly Payment', 'Total Interest': 'Total Interest', 'Total Amount': 'Total Amount' }, inputs: { 'Loan Amount': 'Loan Amount', 'Interest Rate': 'Interest Rate', 'Tenure': 'Tenure' } },
    'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments', button: 'Calculate Returns', result: { 'Invested': 'Invested', 'Est. Returns': 'Est. Returns', 'Total Value': 'Total Value' }, inputs: { 'Monthly Investment': 'Monthly Investment', 'Expected Return Rate': 'Expected Return Rate', 'Time Period': 'Time Period' } },
    'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments', button: 'Calculate EMI', result: { 'Monthly EMI': 'Monthly EMI', 'Total Interest': 'Total Interest', 'Total Amount': 'Total Amount' }, inputs: { 'Loan Amount': 'Loan Amount', 'Interest Rate': 'Interest Rate', 'Loan Tenure': 'Loan Tenure' } },
    'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations', button: 'Calculate', result: { 'Result': 'Result' }, inputs: { 'First Number': 'First Number', 'Second Number': 'Second Number' } },
    'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions', button: '=', result: {}, inputs: {} },
    'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs', button: 'Calculate Calories', result: { 'Maintain Weight': 'Maintain Weight', 'Lose Weight': 'Lose Weight', 'Gain Weight': 'Gain Weight' }, inputs: { Gender: 'Gender', Age: 'Age', Weight: 'Weight', Height: 'Height', 'Activity Level': 'Activity Level' } },
    'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth', button: 'Calculate', result: { 'Total Amount': 'Total Amount', 'Total Interest Earned': 'Total Interest Earned' }, inputs: { 'Principal Amount': 'Principal Amount', 'Annual Rate': 'Annual Rate', 'Time': 'Time', 'Compounding Frequency': 'Compounding Frequency' } },
    'gpa': { label: 'GPA Calculator', description: 'Calculate grade point average', button: 'Calculate GPA', result: { 'Your GPA': 'Your GPA' }, inputs: { Course: 'Course', Credits: 'Credits', Grade: 'Grade' } },
    'period-tracker': { label: 'Period Tracker', description: 'Track cycle, predict periods & fertility', button: 'Predict My Cycle', result: { 'Next Period': 'Next Period', 'Ovulation': 'Ovulation', 'Fertile Window': 'Fertile Window' }, inputs: { 'Last Period': 'Last Period', 'Cycle Length': 'Cycle Length', 'Period Length': 'Period Length' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'About Real Calculator 365', subtitle: 'A modern calculation operating system for everyone.', mission: 'Reliable calculations should be fast, understandable, visual, and accessible to everyone globally.', howItWorks: 'How It Works', noAccount: 'No account required — open any calculator and start instantly.', instantResults: 'Results compute live as you type, drag, or select options.', privacyFirst: 'History and favorites save locally in your browser for convenience.', globalAccess: 'All calculators are free forever; no feature locks or hidden tiers.' },
    contact: { title: 'Contact', subtitle: 'Questions, feedback, partnerships, feature requests, or enterprise calculators? We read everything.', emailLabel: 'Email', businessLabel: 'Business', responseLabel: 'Response', sendMessage: 'Send a message', headquarters: 'Headquarters' },
    privacy: { title: 'Privacy Policy', effectiveDate: 'Effective date: August 2026 · Last updated: August 2026', whatWeCollect: 'What We Collect', localStorage: 'Local Storage', analytics: 'Analytics', thirdParties: 'Third Parties', yourRights: 'Your Rights' },
    terms: { title: 'Terms of Service', effectiveDate: 'Effective date: August 2026 · By using Real Calculator 365, you agree to these terms.', useOfService: 'Use of Service', ip: 'Intellectual Property', noWarranty: 'No Warranty' },
    blog: { title: 'Blog', subtitle: 'Notes on calculators, design, and making math feel easy.', readMore: 'Read more', tagProduct: 'Product', tagEngineering: 'Engineering', tagAccessibility: 'Accessibility' },
    pricing: { title: 'Pricing', subtitle: 'All 120+ professional calculators. All features. Completely free.', allCategories: 'All Categories Included', faq: { title: 'Frequently Asked Questions' }, freeForever: '100% Free Forever', noSignIn: 'No sign-in, no premium, no hassle — all handled by ads 🎉' },
  },
};

// ============ SPANISH DICTIONARY ============
const es: Dictionary = {
  metaTitle: 'Real Calculator 365 — Calculadoras Online Gratis de Finanzas, Salud, Matemáticas y Más',
  metaDescription:
    'Sin registro, sin premium, sin complicaciones — todo cubierto por anuncios. Accede a más de 120 calculadoras online gratis para finanzas, salud, ciencia, matemáticas, ingeniería y más. Rápidas, precisas y 100% gratis para siempre.',
  nav: { finance: 'Finanzas', health: 'Salud', math: 'Matemáticas', science: 'Ciencia', engineering: 'Ingeniería', converters: 'Conversores', all: 'Todas las Calculadoras', search: 'Buscar' },
  hero: {
    badge: 'Motor de Cálculo con IA',
    titleA: 'Calcula lo que quieras.',
    titleB: 'Al instante.',
    subtitle: 'Calculadoras con IA y herramientas inteligentes para finanzas, salud, ciencia, ingeniería, negocios y la vida diaria. Con la confianza de millones de personas en todo el mundo.',
    searchPlaceholder: 'Buscar calculadoras... (ej.: IMC, EMI, interés)',
    cta: 'Explorar Todas las Calculadoras',
  },
  categories: { title: 'Todas las Calculadoras que Necesitarás', subtitle: 'Más de 120 calculadoras de precisión en {n} categorías. Impulsadas por IA y diseñadas para la velocidad.', tools: 'herramientas' },
  categoryLabels: {
    finance: 'Finanzas', health: 'Salud y Fitness', math: 'Matemáticas', science: 'Ciencia', engineering: 'Ingeniería',
    'date-time': 'Fecha y Hora', education: 'Educación', conversion: 'Conversión', business: 'Negocios y Contabilidad', ai: 'Herramientas de IA',
  },
  popular: { title: 'Las Más Populares', subtitle: 'Usadas por millones cada día', viewAll: 'Ver Todas' },
  ai: { badge: 'Impulsado por IA', title: 'Cálculos Inteligentes. Ideas Inteligentes.', subtitle: 'Más allá de las matemáticas básicas — nuestro motor de IA explica, recomienda y enseña.' },
  trust: { title: 'Diseñado para el Rendimiento y la Confianza', subtitle: 'Infraestructura de nivel empresarial que ofrece cálculos instantáneos y precisos en todo el mundo.' },
  faq: { title: 'Preguntas Frecuentes' },
  footer: { company: 'Empresa', copyright: 'Todos los derechos reservados. Sin registro, sin premium, sin complicaciones — todo cubierto por anuncios.' },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'Calculadora IMC', description: 'Calcula tu Índice de Masa Corporal', button: 'Calcular', result: { 'Your BMI': 'Tu IMC', 'Healthy Range': 'Rango Saludable' }, inputs: { Weight: 'Peso', Height: 'Altura' } },
    'age': { label: 'Calculadora de Edad', description: 'Calcula tu edad exacta', button: 'Calcular Edad', result: { 'Years': 'Años', 'Months': 'Meses', 'Days': 'Días', 'Total Days': 'Días Totales' }, inputs: { 'Date of Birth': 'Fecha de nacimiento' } },
    'loan': { label: 'Calculadora de Préstamos', description: 'Calcula pagos e intereses del préstamo', button: 'Calcular', result: { 'Monthly Payment': 'Pago Mensual', 'Total Interest': 'Interés Total', 'Total Amount': 'Monto Total' }, inputs: { 'Loan Amount': 'Monto del Préstamo', 'Interest Rate': 'Tasa de Interés', 'Tenure': 'Plazo' } },
    'sip': { label: 'Calculadora SIP', description: 'Planifica inversiones en fondos mutuos', button: 'Calcular Rendimientos', result: { 'Invested': 'Invertido', 'Est. Returns': 'Rend. Estimados', 'Total Value': 'Valor Total' }, inputs: { 'Monthly Investment': 'Inversión Mensual', 'Expected Return Rate': 'Tasa de Rendimiento Esperada', 'Time Period': 'Período de Tiempo' } },
    'emi': { label: 'Calculadora EMI', description: 'Calcula cuotas mensuales de préstamos', button: 'Calcular EMI', result: { 'Monthly EMI': 'EMI Mensual', 'Total Interest': 'Interés Total', 'Total Amount': 'Monto Total' }, inputs: { 'Loan Amount': 'Monto del Préstamo', 'Interest Rate': 'Tasa de Interés', 'Loan Tenure': 'Plazo del Préstamo' } },
    'percentage': { label: 'Calculadora de Porcentajes', description: 'Cálculos rápidos de porcentajes', button: 'Calcular', result: { 'Result': 'Resultado' }, inputs: { 'First Number': 'Primer Número', 'Second Number': 'Segundo Número' } },
    'scientific': { label: 'Calculadora Científica', description: 'Funciones científicas avanzadas', button: '=', result: {}, inputs: {} },
    'calorie': { label: 'Calculadora de Calorías', description: 'Calcula tus necesidades calóricas diarias', button: 'Calcular Calorías', result: { 'Maintain Weight': 'Mantener Peso', 'Lose Weight': 'Perder Peso', 'Gain Weight': 'Ganar Peso' }, inputs: { Gender: 'Género', Age: 'Edad', Weight: 'Peso', Height: 'Altura', "Activity Level": 'Nivel de Actividad' } },
    'compound-interest': { label: 'Calculadora de Interés Compuesto', description: 'Calcula el crecimiento del interés compuesto', button: 'Calcular', result: { 'Total Amount': 'Monto Total', 'Total Interest Earned': 'Interés Total Ganado' }, inputs: { 'Principal Amount': 'Monto Principal', 'Annual Rate': 'Tasa Anual', 'Time': 'Tiempo', 'Compounding Frequency': 'Frecuencia de Capitalización' } },
    'gpa': { label: 'Calculadora GPA', description: 'Calcula tu promedio de calificaciones', button: 'Calcular GPA', result: { 'Your GPA': 'Tu GPA' }, inputs: { Course: 'Curso', Credits: 'Créditos', Grade: 'Calificación' } },
    'period-tracker': { label: 'Rastreador de Período', description: 'Rastrea tu ciclo y predice períodos', button: 'Predecir Mi Ciclo', result: { 'Next Period': 'Próximo Período', 'Ovulation': 'Ovulación', 'Fertile Window': 'Ventana Fértil' }, inputs: { 'Last Period': 'Último Período', 'Cycle Length': 'Duración del Ciclo', 'Period Length': 'Duración del Período' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'Acerca de Real Calculator 365', subtitle: 'Un sistema operativo de cálculo moderno para todos.', mission: 'Los cálculos confiables deben ser rápidos, comprensibles, visuales y accesibles para todos a nivel mundial.', howItWorks: 'Cómo Funciona', noAccount: 'No se requiere cuenta — abre cualquier calculadora y comienza al instante.', instantResults: 'Los resultados se calculan en vivo mientras escribes, arrastras o seleccionas opciones.', privacyFirst: 'El historial y los favoritos se guardan localmente en tu navegador.', globalAccess: 'Todas las calculadoras son gratis para siempre; sin bloqueos de funciones ni niveles ocultos.' },
    contact: { title: 'Contacto', subtitle: 'Preguntas, comentarios, asociaciones, solicitudes de funciones o calculadoras empresariales? Leemos todo.', emailLabel: 'Email', businessLabel: 'Negocios', responseLabel: 'Respuesta', sendMessage: 'Enviar un mensaje', headquarters: 'Sede' },
    privacy: { title: 'Política de Privacidad', effectiveDate: 'Fecha de vigencia: agosto 2026 · Última actualización: agosto 2026', whatWeCollect: 'Lo Que Recopilamos', localStorage: 'Almacenamiento Local', analytics: 'Analíticas', thirdParties: 'Terceros', yourRights: 'Tus Derechos' },
    terms: { title: 'Términos de Servicio', effectiveDate: 'Fecha de vigencia: agosto 2026 · Al usar Real Calculator 365, aceptas estos términos.', useOfService: 'Uso del Servicio', ip: 'Propiedad Intelectual', noWarranty: 'Sin Garantía' },
    blog: { title: 'Blog', subtitle: 'Notas sobre calculadoras, diseño y hacer que las matemáticas sean fáciles.', readMore: 'Leer más', tagProduct: 'Producto', tagEngineering: 'Ingeniería', tagAccessibility: 'Accesibilidad' },
    pricing: { title: 'Precios', subtitle: 'Todas las 120+ calculadoras profesionales. Todas las funciones. Completamente gratis.', allCategories: 'Todas las Categorías Incluidas', faq: { title: 'Preguntas Frecuentes' }, freeForever: '100% Gratis Para Siempre', noSignIn: 'Sin registro, sin premium, sin complicaciones — todo cubierto por anuncios 🎉' },
  },
};

// ============ JAPANESE DICTIONARY ============
const ja: Dictionary = {
  metaTitle: 'Real Calculator 365 — 金融・健康・数学など無料オンライン計算機',
  metaDescription:
    '登録不要、プレミアムなし、面倒なし — すべて広告で運営。金融、健康、科学、数学、エンジニアリングなど120以上の無料オンライン計算機。高速・正確・永久に100%無料。',
  nav: { finance: '金融', health: '健康', math: '数学', science: '科学', engineering: 'エンジニアリング', converters: '変換', all: 'すべての計算機', search: '検索' },
  hero: {
    badge: 'AI搭載計算エンジン',
    titleA: '何でも計算。',
    titleB: '即座に。',
    subtitle: '金融、健康、科学、エンジニアリング、ビジネス、日常のためのAI搭載計算機とスマートツール。世界中の何百万ものユーザーに信頼されています。',
    searchPlaceholder: '計算機を検索...（例：BMI、EMI、利息）',
    cta: 'すべての計算機を見る',
  },
  categories: { title: '必要な計算機がすべてここに', subtitle: 'AI搭載、高速設計の{n}カテゴリにわたる120以上の精密計算機。', tools: 'ツール' },
  categoryLabels: {
    finance: '金融', health: '健康', math: '数学', science: '科学', engineering: 'エンジニアリング',
    'date-time': '日付と時刻', education: '教育', conversion: '変換', business: 'ビジネス・会計', ai: 'AIツール',
  },
  popular: { title: '人気の計算機', subtitle: '毎日数百万人に利用', viewAll: 'すべて見る' },
  ai: { badge: 'AI搭載', title: 'スマートな計算。インテリジェントな洞察。', subtitle: '基本的な計算を超えて — AIエンジンが説明し、推奨し、教えます。' },
  trust: { title: 'パフォーマンスと信頼のために構築', subtitle: 'エンタープライズグレードのインフラで、世界中に瞬時かつ正確な計算を提供。' },
  faq: { title: 'よくある質問' },
  footer: { company: '会社情報', copyright: '無断転載を禁じます。登録不要、プレミアムなし — すべて広告で運営。' },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'BMI計算機', description: '体格指数を計算', button: '計算', result: { 'Your BMI': 'あなたのBMI', 'Healthy Range': '健康範囲' }, inputs: { Weight: '体重', Height: '身長' } },
    'age': { label: '年齢計算機', description: '正確な年齢を計算', button: '年齢を計算', result: { 'Years': '年', 'Months': 'ヶ月', 'Days': '日', 'Total Days': '総日数' }, inputs: { 'Date of Birth': '生年月日' } },
    'loan': { label: 'ローン計算機', description: 'ローンの返済額と利息を計算', button: '計算', result: { 'Monthly Payment': '月々の返済額', 'Total Interest': '利息合計', 'Total Amount': '総額' }, inputs: { 'Loan Amount': 'ローン金額', 'Interest Rate': '金利', 'Tenure': '返済期間' } },
    'sip': { label: 'SIP計算機', description: '投資信託の投資を計画', button: 'リターンを計算', result: { 'Invested': '投資額', 'Est. Returns': '推定リターン', 'Total Value': '総額' }, inputs: { 'Monthly Investment': '月次投資額', 'Expected Return Rate': '期待リターン率', 'Time Period': '期間' } },
    'emi': { label: 'EMI計算機', description: 'ローンの月々の返済額を計算', button: 'EMIを計算', result: { 'Monthly EMI': '月々のEMI', 'Total Interest': '利息合計', 'Total Amount': '総額' }, inputs: { 'Loan Amount': 'ローン金額', 'Interest Rate': '金利', 'Loan Tenure': 'ローン期間' } },
    'percentage': { label: 'パーセンテージ計算機', description: '簡単なパーセンテージ計算', button: '計算', result: { 'Result': '結果' }, inputs: { 'First Number': '最初の数値', 'Second Number': '2番目の数値' } },
    'scientific': { label: '科学電卓', description: '高度な科学関数', button: '=', result: {}, inputs: {} },
    'calorie': { label: 'カロリー計算機', description: '1日のカロリー必要量を計算', button: 'カロリーを計算', result: { 'Maintain Weight': '体重維持', 'Lose Weight': '体重減少', 'Gain Weight': '体重増加' }, inputs: { Gender: '性別', Age: '年齢', Weight: '体重', Height: '身長', "Activity Level": '活動レベル' } },
    'compound-interest': { label: '複利計算機', description: '複利の成長を計算', button: '計算', result: { 'Total Amount': '総額', 'Total Interest Earned': '獲得利息合計' }, inputs: { 'Principal Amount': '元本', 'Annual Rate': '年利', 'Time': '時間', 'Compounding Frequency': '複利計算頻度' } },
    'gpa': { label: 'GPA計算機', description: '成績平均点を計算', button: 'GPAを計算', result: { 'Your GPA': 'あなたのGPA' }, inputs: { Course: '科目', Credits: '単位数', Grade: '成績' } },
    'period-tracker': { label: '生理周期トラッカー', description: '周期を追跡し生理を予測', button: '周期を予測', result: { 'Next Period': '次の生理', 'Ovulation': '排卵', 'Fertile Window': '受胎可能期間' }, inputs: { 'Last Period': '前回の生理', 'Cycle Length': '周期の長さ', 'Period Length': '生理期間の長さ' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'Real Calculator 365について', subtitle: 'すべての人のための現代的な計算オペレーティングシステム。', mission: '信頼性の高い計算は、世界中のすべての人にとって迅速で、理解しやすく、視覚的で、アクセス可能であるべきです。', howItWorks: '動作方法', noAccount: 'アカウントは不要 — 任意の計算機を開いてすぐに始められます。', instantResults: '結果は入力する、ドラッグする、または選択する際にリアルタイムで計算されます。', privacyFirst: '履歴とお気に入りはブラウザにローカル保存されます。', globalAccess: 'すべての計算機は永久に無料です。機能のロックや隠し tier はありません。' },
    contact: { title: 'お問い合わせ', subtitle: 'ご質問、フィードバック、パートナーシップ、機能リクエスト、またはエンタープライズ計算機? すべて読みます。', emailLabel: 'メール', businessLabel: 'ビジネス', responseLabel: '対応', sendMessage: 'メッセージを送信', headquarters: '本社' },
    privacy: { title: 'プライバシーポリシー', effectiveDate: '有効期限: 2026年8月 · 最終更新: 2026年8月', whatWeCollect: '収集する情報', localStorage: 'ローカルストレージ', analytics: '分析', thirdParties: '第三者', yourRights: 'あなたの権利' },
    terms: { title: '利用規約', effectiveDate: '有効期限: 2026年8月 · Real Calculator 365を使用することで、これらの条項に同意したものとみなされます。', useOfService: 'サービスの使用', ip: '知的財産権', noWarranty: '無保証' },
    blog: { title: 'ブログ', subtitle: '計算機、デザイン、数学を簡単にするに関するノート。', readMore: '続きを読む', tagProduct: '製品', tagEngineering: 'エンジニアリング', tagAccessibility: 'アクセシビリティ' },
    pricing: { title: '料金', subtitle: 'すべての120以上の専門的な計算機。すべての機能。完全に無料。', allCategories: 'すべてのカテゴリが含まれる', faq: { title: 'よくある質問' }, freeForever: '100%永久無料', noSignIn: '登録不要、プレミアムなし — すべて広告で運営 🎉' },
  },
};

// ============ FRENCH DICTIONARY ============
const fr: Dictionary = {
  metaTitle: 'Real Calculator 365 — Calculatrices en Ligne Gratuites : Finance, Santé, Maths et Plus',
  metaDescription:
    "Sans inscription, sans premium, sans souci — tout est financé par la publicité. Plus de 120 calculatrices en ligne gratuites pour la finance, la santé, les sciences, les mathématiques, l'ingénierie et plus. Rapides, précises et 100% gratuites pour toujours.",
  nav: { finance: 'Finance', health: 'Santé', math: 'Maths', science: 'Sciences', engineering: 'Ingénierie', converters: 'Convertisseurs', all: 'Toutes les Calculatrices', search: 'Rechercher' },
  hero: {
    badge: "Moteur de Calcul Propulsé par l'IA",
    titleA: 'Calculez Tout.',
    titleB: 'Instantanément.',
    subtitle: "Calculatrices IA et outils intelligents pour la finance, la santé, les sciences, l'ingénierie, les affaires et la vie quotidienne. Adoptées par des millions d'utilisateurs dans le monde.",
    searchPlaceholder: 'Rechercher des calculatrices... (ex. : IMC, mensualité, intérêts)',
    cta: 'Explorer Toutes les Calculatrices',
  },
  categories: { title: 'Toutes les Calculatrices Dont Vous Avez Besoin', subtitle: "Plus de 120 calculatrices de précision dans {n} catégories. Propulsées par l'IA et conçues pour la vitesse.", tools: 'outils' },
  categoryLabels: {
    finance: 'Finance', health: 'Santé et Fitness', math: 'Mathématiques', science: 'Sciences', engineering: 'Ingénierie',
    'date-time': 'Date et Heure', education: 'Éducation', conversion: 'Conversion', business: 'Entreprises et Comptabilité', ai: 'Outils IA',
  },
  popular: { title: 'Les Plus Populaires', subtitle: "Utilisées par des millions chaque jour", viewAll: 'Voir Tout' },
  ai: { badge: "Propulsé par l'IA", title: 'Calculs Intelligents. Analyses Intelligentes.', subtitle: "Au-delà des mathématiques de base — notre moteur IA explique, recommande et enseigne." },
  trust: { title: 'Conçu pour la Performance et la Confiance', subtitle: "Une infrastructure de niveau entreprise pour des calculs instantanés et précis dans le monde entier." },
  faq: { title: 'Questions Fréquentes' },
  footer: { company: 'Entreprise', copyright: "Tous droits réservés. Sans inscription, sans premium, sans souci — tout est financé par la publicité." },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'Calculateur IMC', description: "Calculez votre Indice de Masse Corporelle", button: 'Calculer', result: { 'Your BMI': 'Votre IMC', 'Healthy Range': 'Plage Saine' }, inputs: { Weight: 'Poids', Height: 'Taille' } },
    'age': { label: 'Calculateur d\'âge', description: 'Calculez votre âge exact', button: 'Calculer l\'âge', result: { 'Years': 'Années', 'Months': 'Mois', 'Days': 'Jours', 'Total Days': 'Jours Totaux' }, inputs: { 'Date of Birth': 'Date de naissance' } },
    'loan': { label: 'Calculateur de Prêts', description: 'Calculez les paiements et intérêts du prêt', button: 'Calculer', result: { 'Monthly Payment': 'Paiement Mensuel', 'Total Interest': 'Intérêt Total', 'Total Amount': 'Montant Total' }, inputs: { 'Loan Amount': 'Montant du Prêt', 'Interest Rate': 'Taux d\'intérêt', 'Tenure': 'Durée' } },
    'sip': { label: 'Calculateur SIP', description: 'Planifiez les investissements en fonds communs', button: 'Calculer les Rendements', result: { 'Invested': 'Investi', 'Est. Returns': 'Rend. Estimés', 'Total Value': 'Valeur Totale' }, inputs: { 'Monthly Investment': 'Investissement Mensuel', 'Expected Return Rate': 'Taux de Rendement Attendu', 'Time Period': 'Période' } },
    'emi': { label: 'Calculateur EMI', description: 'Calculez les mensualités de prêt', button: 'Calculer l\'EMI', result: { 'Monthly EMI': 'EMI Mensuel', 'Total Interest': 'Intérêt Total', 'Total Amount': 'Montant Total' }, inputs: { 'Loan Amount': 'Montant du Prêt', 'Interest Rate': 'Taux d\'intérêt', 'Loan Tenure': 'Durée du Prêt' } },
    'percentage': { label: 'Calculateur de Pourcentage', description: 'Calculs rapides de pourcentage', button: 'Calculer', result: { 'Result': 'Résultat' }, inputs: { 'First Number': 'Premier Nombre', 'Second Number': 'Deuxième Nombre' } },
    'scientific': { label: 'Calculatrice Scientifique', description: 'Fonctions scientifiques avancées', button: '=', result: {}, inputs: {} },
    'calorie': { label: 'Calculateur de Calories', description: 'Calculez vos besoins caloriques quotidiens', button: 'Calculer les Calories', result: { 'Maintain Weight': 'Maintenir le Poids', 'Lose Weight': 'Perdre du Poids', 'Gain Weight': 'Gagner du Poids' }, inputs: { Gender: 'Genre', Age: 'Âge', Weight: 'Poids', Height: 'Taille', "Activity Level": 'Niveau d\'Activité' } },
    'compound-interest': { label: 'Calculateur d\'Intérêts Composés', description: 'Calculez la croissance des intérêts composés', button: 'Calculer', result: { 'Total Amount': 'Montant Total', 'Total Interest Earned': 'Intérêts Totaux Gagnés' }, inputs: { 'Principal Amount': 'Montant Principal', 'Annual Rate': 'Taux Annuel', 'Time': 'Temps', 'Compounding Frequency': 'Fréquence de Capitalisation' } },
    'gpa': { label: 'Calculateur GPA', description: 'Calculez votre moyenne pondérée', button: 'Calculer le GPA', result: { 'Your GPA': 'Votre GPA' }, inputs: { Course: 'Cours', Credits: 'Crédits', Grade: 'Note' } },
    'period-tracker': { label: 'Suivi des Règles', description: 'Suivez votre cycle et prédisez les règles', button: 'Prédire Mon Cycle', result: { 'Next Period': 'Prochaines Règles', 'Ovulation': 'Ovulation', 'Fertile Window': 'Fenêtre Fertile' }, inputs: { 'Last Period': 'Dernières Règles', 'Cycle Length': 'Durée du Cycle', 'Period Length': 'Durée des Règles' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'À Propos de Real Calculator 365', subtitle: 'Un système d\'exploitation de calcul moderne pour tout le monde.', mission: 'Des calculs fiables doivent être rapides, compréhensibles, visuels et accessibles à tous dans le monde.', howItWorks: 'Comment Ça Fonctionne', noAccount: 'Pas de compte requis — ouvrez n\'importe quelle calculatrice et commencez immédiatement.', instantResults: 'Les résultats se calculent en direct pendant que vous tapez, glissez ou sélectionnez des options.', privacyFirst: 'L\'historique et les favoris sont enregistrés localement dans votre navigateur.', globalAccess: 'Toutes les calculatrices sont gratuites pour toujours ; aucune restriction de fonctionnalité ni niveau caché.' },
    contact: { title: 'Contact', subtitle: 'Questions, commentaires, partenariats, demandes de fonctionnalités ou calculateurs entreprise ? Nous lisons tout.', emailLabel: 'Email', businessLabel: 'Entreprises', responseLabel: 'Réponse', sendMessage: 'Envoyer un message', headquarters: 'Siège Social' },
    privacy: { title: 'Politique de Confidentialité', effectiveDate: 'Date d\'effet : août 2026 · Dernière mise à jour : août 2026', whatWeCollect: 'Ce Que Nous Collectons', localStorage: 'Stockage Local', analytics: 'Analytique', thirdParties: 'Tierces Parties', yourRights: 'Vos Droits' },
    terms: { title: 'Conditions d\'Utilisation', effectiveDate: 'Date d\'effet : août 2026 · En utilisant Real Calculator 365, vous acceptez ces conditions.', useOfService: 'Utilisation du Service', ip: 'Propriété Intellectuelle', noWarranty: 'Sans Garantie' },
    blog: { title: 'Blog', subtitle: 'Notes sur les calculatrices, le design et rendre les maths faciles.', readMore: 'Lire la suite', tagProduct: 'Produit', tagEngineering: 'Ingénierie', tagAccessibility: 'Accessibilité' },
    pricing: { title: 'Tarifs', subtitle: 'Toutes les 120+ calculatrices professionnelles. Toutes les fonctionnalités. Complètement gratuit.', allCategories: 'Toutes les Catégories Incluses', faq: { title: 'Questions Fréquentes' }, freeForever: '100% Gratuit Pour Toujours', noSignIn: 'Pas d\'inscription, pas de premium, pas de tracas — tout géré par la pub 🎉' },
  },
};

// ============ GERMAN DICTIONARY ============
const de: Dictionary = {
  metaTitle: 'Real Calculator 365 — Kostenlose Online-Rechner für Finanzen, Gesundheit, Mathe & Mehr',
  metaDescription:
    'Keine Anmeldung, kein Premium, kein Aufwand — alles über Werbung finanziert. Über 120 kostenlose Online-Rechner für Finanzen, Gesundheit, Wissenschaft, Mathe, Technik und mehr. Schnell, genau und für immer 100% kostenlos.',
  nav: { finance: 'Finanzen', health: 'Gesundheit', math: 'Mathe', science: 'Wissenschaft', engineering: 'Technik', converters: 'Konverter', all: 'Alle Rechner', search: 'Suchen' },
  hero: {
    badge: 'KI-gestützte Rechen-Engine',
    titleA: 'Berechne alles.',
    titleB: 'Sofort.',
    subtitle: 'KI-gestützte Rechner und intelligente Tools für Finanzen, Gesundheit, Wissenschaft, Technik, Business und den Alltag. Von Millionen weltweit genutzt.',
    searchPlaceholder: 'Rechner suchen... (z. B. BMI, Rate, Zinsen)',
    cta: 'Alle Rechner entdecken',
  },
  categories: { title: 'Jeder Rechner, den Sie je brauchen werden', subtitle: 'Über 120 Präzisionsrechner in {n} Kategorien. KI-gestützt und auf Geschwindigkeit optimiert.', tools: 'Tools' },
  categoryLabels: {
    finance: 'Finanzen', health: 'Gesundheit & Fitness', math: 'Mathe', science: 'Wissenschaft', engineering: 'Technik',
    'date-time': 'Datum & Zeit', education: 'Bildung', conversion: 'Umrechnung', business: 'Business & Buchhaltung', ai: 'KI-Tools',
  },
  popular: { title: 'Am Beliebtesten', subtitle: 'Täglich von Millionen genutzt', viewAll: 'Alle ansehen' },
  ai: { badge: 'KI-gestützt', title: 'Smarte Berechnungen. Intelligente Einblicke.', subtitle: 'Mehr als Grundmathematik — unsere KI-Engine erklärt, empfiehlt und lehrt.' },
  trust: { title: 'Gebaut für Leistung & Vertrauen', subtitle: 'Enterprise-Infrastruktur für sofortige, genaue Berechnungen weltweit.' },
  faq: { title: 'Häufige Fragen' },
  footer: { company: 'Unternehmen', copyright: 'Alle Rechte vorbehalten. Keine Anmeldung, kein Premium, kein Aufwand — alles über Werbung finanziert.' },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'BMI-Rechner', description: 'Körpermasseindex berechnen', button: 'Berechnen', result: { 'Your BMI': 'Ihr BMI', 'Healthy Range': 'Gesunder Bereich' }, inputs: { Weight: 'Gewicht', Height: 'Körpergröße' } },
    'age': { label: 'Alter-Rechner', description: 'Ihr genaues Alter berechnen', button: 'Alter berechnen', result: { 'Years': 'Jahre', 'Months': 'Monate', 'Days': 'Tage', 'Total Days': 'Gesamttage' }, inputs: { 'Date of Birth': 'Geburtsdatum' } },
    'loan': { label: 'Darlehensrechner', description: 'Darlehenszahlungen und Zinsen berechnen', button: 'Berechnen', result: { 'Monthly Payment': 'Monatliche Rate', 'Total Interest': 'Gesamtzinsen', 'Total Amount': 'Gesamtbetrag' }, inputs: { 'Loan Amount': 'Darlehensbetrag', 'Interest Rate': 'Zinssatz', 'Tenure': 'Laufzeit' } },
    'sip': { label: 'SIP-Rechner', description: 'Investitionen in Investmentfonds planen', button: 'Renditen berechnen', result: { 'Invested': 'Investiert', 'Est. Returns': 'Geschätzte Renditen', 'Total Value': 'Gesamtwert' }, inputs: { 'Monthly Investment': 'Monatliche Investition', 'Expected Return Rate': 'Erwartete Rendite', 'Time Period': 'Zeitraum' } },
    'emi': { label: 'EMI-Rechner', description: 'Monatliche Raten berechnen', button: 'EMI berechnen', result: { 'Monthly EMI': 'Monatliche EMI', 'Total Interest': 'Gesamtzinsen', 'Total Amount': 'Gesamtbetrag' }, inputs: { 'Loan Amount': 'Darlehensbetrag', 'Interest Rate': 'Zinssatz', 'Loan Tenure': 'Darlehenslaufzeit' } },
    'percentage': { label: 'Prozentrechner', description: 'Schnelle Prozentrechnungen', button: 'Berechnen', result: { 'Result': 'Ergebnis' }, inputs: { 'First Number': 'Erste Zahl', 'Second Number': 'Zweite Zahl' } },
    'scientific': { label: 'Wissenschaftlicher Rechner', description: 'Erweiterte wissenschaftliche Funktionen', button: '=', result: {}, inputs: {} },
    'calorie': { label: 'Kalorienrechner', description: 'Täglichen Kalorienbedarf berechnen', button: 'Kalorien berechnen', result: { 'Maintain Weight': 'Gewicht halten', 'Lose Weight': 'Abnehmen', 'Gain Weight': 'Zunehmen' }, inputs: { Gender: 'Geschlecht', Age: 'Alter', Weight: 'Gewicht', Height: 'Körpergröße', "Activity Level": 'Aktivitätslevel' } },
    'compound-interest': { label: 'Zinseszinsrechner', description: 'Zinseszinswachstum berechnen', button: 'Berechnen', result: { 'Total Amount': 'Gesamtbetrag', 'Total Interest Earned': 'Gesamtzinsen Erwirtschaftet' }, inputs: { 'Principal Amount': 'Kapital', 'Annual Rate': 'Jahreszins', 'Time': 'Zeit', 'Compounding Frequency': 'Verzinsungshäufigkeit' } },
    'gpa': { label: 'GPA-Rechner', description: 'Notendurchschnitt berechnen', button: 'GPA berechnen', result: { 'Your GPA': 'Ihr GPA' }, inputs: { Course: 'Kurs', Credits: 'Punkte', Grade: 'Note' } },
    'period-tracker': { label: 'Monatszyklus-Tracker', description: 'Zyklus verfolgen und Periode vorhersagen', button: 'Meinen Zyklus vorhersagen', result: { 'Next Period': 'Nächste Periode', 'Ovulation': 'Ovulation', 'Fertile Window': 'Fruchtbarer Zeitraum' }, inputs: { 'Last Period': 'Letzte Periode', 'Cycle Length': 'Zyklusdauer', 'Period Length': 'Periode Dauer' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'Über Real Calculator 365', subtitle: 'Ein modernes Berechnungs-Betriebssystem für jeden.', mission: 'Zuverlässige Berechnungen sollten schnell, verständlich, visuell und weltweit zugänglich sein.', howItWorks: 'Wie es funktioniert', noAccount: 'Kein Konto erforderlich — öffnen Sie jeden Taschenrechner und sofort.', instantResults: 'Ergebnisse werden in Echtzeit berechnet, während Sie tippen, ziehen oder Optionen auswählen.', privacyFirst: 'Verlauf und Favoriten werden lokal in Ihrem Browser gespeichert.', globalAccess: 'Alle Taschenrechner sind für immer kostenlos; keine Funktionseinschränkungen oder versteckte Ebenen.' },
    contact: { title: 'Kontakt', subtitle: 'Fragen, Feedback, Partnerschaften, Funktionsanfragen oder Unternehmensrechner? Wir lesen alles.', emailLabel: 'E-Mail', businessLabel: 'Geschäft', responseLabel: 'Antwort', sendMessage: 'Nachricht senden', headquarters: 'Hauptsitz' },
    privacy: { title: 'Datenschutzrichtlinie', effectiveDate: 'Gültig ab: August 2026 · Zuletzt aktualisiert: August 2026', whatWeCollect: 'Was wir sammeln', localStorage: 'Lokaler Speicher', analytics: 'Analyse', thirdParties: 'Dritte', yourRights: 'Ihre Rechte' },
    terms: { title: 'Nutzungsbedingungen', effectiveDate: 'Gültig ab: August 2026 · Durch die Nutzung von Real Calculator 365 stimmen Sie diesen Bedingungen zu.', useOfService: 'Nutzung des Dienstes', ip: 'Geistiges Eigentum', noWarranty: 'Ohne Gewährleistung' },
    blog: { title: 'Blog', subtitle: 'Notizen zu Taschenrechnern, Design und Mathematik leicht gemacht.', readMore: 'Weiterlesen', tagProduct: 'Produkt', tagEngineering: 'Ingenieurwesen', tagAccessibility: 'Barrierefreiheit' },
    pricing: { title: 'Preise', subtitle: 'Alle 120+ professionellen Taschenrechner. Alle Funktionen. Komplett kostenlos.', allCategories: 'Alle Kategorien enthalten', faq: { title: 'Häufig gestellte Fragen' }, freeForever: '100% ewig kostenlos', noSignIn: 'Keine Anmeldung, kein Premium, kein Aufwand — alles durch Werbung finanziert 🎉' },
  },
};

// ============ PORTUGUESE DICTIONARY ============
const pt: Dictionary = {
  metaTitle: 'Real Calculator 365 — Calculadoras Online Grátis para Finanças, Saúde, Matemática e Mais',
  metaDescription:
    'Sem cadastro, sem premium, sem complicação — tudo mantido por anúncios. Mais de 120 calculadoras online grátis para finanças, saúde, ciência, matemática, engenharia e mais. Rápidas, precisas e 100% gratuitas para sempre.',
  nav: { finance: 'Finanças', health: 'Saúde', math: 'Matemática', science: 'Ciência', engineering: 'Engenharia', converters: 'Conversores', all: 'Todas as Calculadoras', search: 'Buscar' },
  hero: {
    badge: 'Motor de Cálculo com IA',
    titleA: 'Calcule Tudo.',
    titleB: 'Na hora.',
    subtitle: 'Calculadoras com IA e ferramentas inteligentes para finanças, saúde, ciência, engenharia, negócios e o dia a dia. Usadas por milhões no mundo inteiro.',
    searchPlaceholder: 'Buscar calculadoras... (ex.: IMC, parcelas, juros)',
    cta: 'Explorar Todas as Calculadoras',
  },
  categories: { title: 'Todas as Calculadoras que Você Precisa', subtitle: 'Mais de 120 calculadoras de precisão em {n} categorias. Com IA e feitas para velocidade.', tools: 'ferramentas' },
  categoryLabels: {
    finance: 'Finanças', health: 'Saúde e Fitness', math: 'Matemática', science: 'Ciência', engineering: 'Engenharia',
    'date-time': 'Data e Hora', education: 'Educação', conversion: 'Conversão', business: 'Negócios e Contabilidade', ai: 'Ferramentas de IA',
  },
  popular: { title: 'Mais Populares', subtitle: 'Usadas por milhões todos os dias', viewAll: 'Ver Todas' },
  ai: { badge: 'Com IA', title: 'Cálculos Inteligentes. Insights Inteligentes.', subtitle: 'Além da matemática básica — nosso motor de IA explica, recomenda e ensina.' },
  trust: { title: 'Feito para Desempenho e Confiança', subtitle: 'Infraestrutura de nível empresarial com cálculos instantâneos e precisos no mundo todo.' },
  faq: { title: 'Perguntas Frequentes' },
  footer: { company: 'Empresa', copyright: 'Todos os direitos reservados. Sem cadastro, sem premium, sem complicação — tudo mantido por anúncios.' },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'Calculadora IMC', description: 'Calcule seu Índice de Massa Corporal', button: 'Calcular', result: { 'Your BMI': 'Seu IMC', 'Healthy Range': 'Faixa Saudável' }, inputs: { Weight: 'Peso', Height: 'Altura' } },
    'age': { label: 'Calculadora de Idade', description: 'Calcule sua idade exata', button: 'Calcular Idade', result: { 'Years': 'Anos', 'Months': 'Meses', 'Days': 'Dias', 'Total Days': 'Dias Totais' }, inputs: { 'Date of Birth': 'Data de Nascimento' } },
    'loan': { label: 'Calculadora de Empréstimos', description: 'Calcule pagamentos e juros do empréstimo', button: 'Calcular', result: { 'Monthly Payment': 'Parcela Mensal', 'Total Interest': 'Juros Totais', 'Total Amount': 'Valor Total' }, inputs: { 'Loan Amount': 'Valor do Empréstimo', 'Interest Rate': 'Taxa de Juros', 'Tenure': 'Prazo' } },
    'sip': { label: 'Calculadora SIP', description: 'Planeje investimentos em fundos mútuos', button: 'Calcular Retornos', result: { 'Invested': 'Investido', 'Est. Returns': 'Ret. Estimados', 'Total Value': 'Valor Total' }, inputs: { 'Monthly Investment': 'Investimento Mensal', 'Expected Return Rate': 'Taxa de Retorno Esperada', 'Time Period': 'Período' } },
    'emi': { label: 'Calculadora EMI', description: 'Calcule parcelas mensais de empréstimos', button: 'Calcular EMI', result: { 'Monthly EMI': 'EMI Mensal', 'Total Interest': 'Juros Totais', 'Total Amount': 'Valor Total' }, inputs: { 'Loan Amount': 'Valor do Empréstimo', 'Interest Rate': 'Taxa de Juros', 'Loan Tenure': 'Prazo do Empréstimo' } },
    'percentage': { label: 'Calculadora de Porcentagem', description: 'Cálculos rápidos de porcentagem', button: 'Calcular', result: { 'Result': 'Resultado' }, inputs: { 'First Number': 'Primeiro Número', 'Second Number': 'Segundo Número' } },
    'scientific': { label: 'Calculadora Científica', description: 'Funções científicas avançadas', button: '=', result: {}, inputs: {} },
    'calorie': { label: 'Calculadora de Calorias', description: 'Calcule suas necessidades calóricas diárias', button: 'Calcular Calorias', result: { 'Maintain Weight': 'Manter Peso', 'Lose Weight': 'Perder Peso', 'Gain Weight': 'Ganhar Peso' }, inputs: { Gender: 'Gênero', Age: 'Idade', Weight: 'Peso', Height: 'Altura', "Activity Level": 'Nível de Atividade' } },
    'compound-interest': { label: 'Calculadora de Juros Compostos', description: 'Calcule o crescimento de juros compostos', button: 'Calcular', result: { 'Total Amount': 'Valor Total', 'Total Interest Earned': 'Juros Totais Ganhos' }, inputs: { 'Principal Amount': 'Principal', 'Annual Rate': 'Taxa Anual', 'Time': 'Tempo', 'Compounding Frequency': 'Frequência de Capitalização' } },
    'gpa': { label: 'Calculadora GPA', description: 'Calcule seu coeficiente de rendimento', button: 'Calcular GPA', result: { 'Your GPA': 'Seu GPA' }, inputs: { Course: 'Curso', Credits: 'Créditos', Grade: 'Nota' } },
    'period-tracker': { label: 'Rastreador de Ciclo', description: 'Acompanhe seu ciclo e preveja períodos', button: 'Prever Meu Ciclo', result: { 'Next Period': 'Próximo Período', 'Ovulation': 'Ovulação', 'Fertile Window': 'Janela Fértil' }, inputs: { 'Last Period': 'Último Período', 'Cycle Length': 'Duração do Ciclo', 'Period Length': 'Duração do Período' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'Sobre a Real Calculator 365', subtitle: 'Um sistema operacional de cálculo moderno para todos.', mission: 'Cálculos confiáveis devem ser rápidos, compreensíveis, visuais e acessíveis a todos globalmente.', howItWorks: 'Como Funciona', noAccount: 'Nenhuma conta necessária — abra qualquer calculadora e comece instantaneamente.', instantResults: 'Os resultados são calculados em tempo real enquanto você digita, arrasta ou seleciona opções.', privacyFirst: 'Histórico e favoritos são salvos localmente no seu navegador.', globalAccess: 'Todas as calculadoras são gratuitas para sempre; sem bloqueios de recursos ou níveis ocultos.' },
    contact: { title: 'Contato', subtitle: 'Perguntas, feedback, parcerias, solicitações de recursos ou calculadoras empresariais? Leu tudo.', emailLabel: 'E-mail', businessLabel: 'Negócios', responseLabel: 'Resposta', sendMessage: 'Enviar Mensagem', headquarters: 'Sede' },
    privacy: { title: 'Política de Privacidade', effectiveDate: 'Data efetiva: agosto 2026 · Última atualização: agosto 2026', whatWeCollect: 'O Que Coletamos', localStorage: 'Armazenamento Local', analytics: 'Análise', thirdParties: 'Terceiros', yourRights: 'Seus Direitos' },
    terms: { title: 'Termos de Serviço', effectiveDate: 'Data efetiva: agosto 2026 · Ao usar Real Calculator 365, você concorda com estes termos.', useOfService: 'Uso do Serviço', ip: 'Propriedade Intelectual', noWarranty: 'Sem Garantia' },
    blog: { title: 'Blog', subtitle: 'Notas sobre calculadoras, design e tornar a matemática fácil.', readMore: 'Leia mais', tagProduct: 'Produto', tagEngineering: 'Engenharia', tagAccessibility: 'Acessibilidade' },
    pricing: { title: 'Preços', subtitle: 'Todas as 120+ calculadoras profissionais. Todas as funcionalidades. Completamente grátis.', allCategories: 'Todas as Categorias Incluídas', faq: { title: 'Perguntas Frequentes' }, freeForever: '100% Grátis Para Sempre', noSignIn: 'Sem cadastro, sem premium, sem complicação — tudo mantido por anúncios 🎉' },
  },
};

// ============ KOREAN DICTIONARY ============
const ko: Dictionary = {
  metaTitle: 'Real Calculator 365 — 금융, 건강, 수학 등 무료 온라인 계산기',
  metaDescription:
    '가입 없음, 프리미엄 없음, 번거로움 없음 — 모든 것은 광고로 운영됩니다. 금융, 건강, 과학, 수학, 공학 등 120개 이상의 무료 온라인 계산기를 이용하세요. 빠르고 정확하며 영원히 100% 무료입니다.',
  nav: { finance: '금융', health: '건강', math: '수학', science: '과학', engineering: '공학', converters: '변환', all: '전체 계산기', search: '검색' },
  hero: {
    badge: 'AI 기반 계산 엔진',
    titleA: '무엇이든 계산하세요.',
    titleB: '즉시.',
    subtitle: '금융, 건강, 과학, 공학, 비즈니스, 일상을 위한 AI 기반 계산기와 스마트 도구. 전 세계 수백만 사용자가 신뢰합니다.',
    searchPlaceholder: '계산기 검색... (예: BMI, EMI, 이자)',
    cta: '모든 계산기 둘러보기',
  },
  categories: { title: '필요한 모든 계산기', subtitle: '{n}개 카테고리의 120개 이상 정밀 계산기. AI 기반으로 속도에 최적화.', tools: '개 도구' },
  categoryLabels: {
    finance: '금융', health: '건강', math: '수학', science: '과학', engineering: '공학',
    'date-time': '날짜와 시간', education: '교육', conversion: '변환', business: '비즈니스와 회계', ai: 'AI 도구',
  },
  popular: { title: '인기 계산기', subtitle: '매일 수백만 명이 사용', viewAll: '전체 보기' },
  ai: { badge: 'AI 기반', title: '스마트 계산. 지능형 인사이트.', subtitle: '기본 수학 그 이상 — AI 엔진이 설명하고, 추천하고, 가르칩니다.' },
  trust: { title: '성능과 신뢰를 위해 설계', subtitle: '엔터프라이즈급 인프라로 전 세계에 즉각적이고 정확한 계산 제공.' },
  faq: { title: '자주 묻는 질문' },
  footer: { company: '회사', copyright: '모든 권리 보유. 가입 없음, 프리미엄 없음 — 모든 것은 광고로 운영됩니다.' },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'BMI 계산기', description: '체질량지수를 계산하세요', button: '계산', result: { 'Your BMI': '나의 BMI', 'Healthy Range': '건강 범위' }, inputs: { Weight: '체중', Height: '키' } },
    'age': { label: '나이 계산기', description: '정확한 나이를 계산하세요', button: '나이 계산', result: { 'Years': '년', 'Months': '개월', 'Days': '일', 'Total Days': '총 일수' }, inputs: { 'Date of Birth': '생년월일' } },
    'loan': { label: '대출 계산기', description: '대출 상환액과 이자를 계산하세요', button: '계산', result: { 'Monthly Payment': '월 상환액', 'Total Interest': '총 이자', 'Total Amount': '총액' }, inputs: { 'Loan Amount': '대출 금액', 'Interest Rate': '이자율', 'Tenure': '상환 기간' } },
    'sip': { label: 'SIP 계산기', description: '뮤추얼 펀드 투자를 계획하세요', button: '수익률 계산', result: { 'Invested': '투자액', 'Est. Returns': '추정 수익', 'Total Value': '총액' }, inputs: { 'Monthly Investment': '월간 투자액', 'Expected Return Rate': '기대 수익률', 'Time Period': '기간' } },
    'emi': { label: 'EMI 계산기', description: '대출 월 상환액을 계산하세요', button: 'EMI 계산', result: { 'Monthly EMI': '월 EMI', 'Total Interest': '총 이자', 'Total Amount': '총액' }, inputs: { 'Loan Amount': '대출 금액', 'Interest Rate': '이자율', 'Loan Tenure': '대출 기간' } },
    'percentage': { label: '백분율 계산기', description: '빠른 백분율 계산', button: '계산', result: { 'Result': '결과' }, inputs: { 'First Number': '첫 번째 수', 'Second Number': '두 번째 수' } },
    'scientific': { label: '과학 계산기', description: '고급 과학 함수', button: '=', result: {}, inputs: {} },
    'calorie': { label: '칼로리 계산기', description: '일일 칼로리 필요량을 계산하세요', button: '칼로리 계산', result: { 'Maintain Weight': '체중 유지', 'Lose Weight': '체중 감량', 'Gain Weight': '체중 증가' }, inputs: { Gender: '성별', Age: '나이', Weight: '체중', Height: '키', "Activity Level": '활동 수준' } },
    'compound-interest': { label: '복리 계산기', description: '복리 성장을 계산하세요', button: '계산', result: { 'Total Amount': '총액', 'Total Interest Earned': '총 이자 수익' }, inputs: { 'Principal Amount': '원금', 'Annual Rate': '연이율', 'Time': '시간', 'Compounding Frequency': '복리 빈도' } },
    'gpa': { label: 'GPA 계산기', description: '학점 평균을 계산하세요', button: 'GPA 계산', result: { 'Your GPA': '나의 GPA' }, inputs: { Course: '과목', Credits: '학점', Grade: '성적' } },
    'period-tracker': { label: '생리 주기 추적기', description: '주기를 추적하고 생리를 예측하세요', button: '주기 예측', result: { 'Next Period': '다음 생리', 'Ovulation': '배란', 'Fertile Window': '수태 가능 기간' }, inputs: { 'Last Period': '마지막 생리', 'Cycle Length': '주기 길이', 'Period Length': '생리 기간' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'Real Calculator 365 소개', subtitle: '모든 사람을 위한 현대적인 계산 운영 체제.', mission: '신뢰할 수 있는 계산은 전 세계적으로 빠르고, 이해 가능하고, 시각적이며, 접근 가능해야 합니다.', howItWorks: '작동 방식', noAccount: '계정이 불필요 — 임의의 계산기를 열고 바로 시작하세요.', instantResults: '결과는 입력, 드래그, 옵션 선택 시 실시간으로 계산됩니다.', privacyFirst: '기록 및 즐겨찾기는 브라우저에 로컬 저장됩니다.', globalAccess: '모든 계산기는 영구 무료이며, 기능 잠금이나 숨겨진 레벨이 없습니다.' },
    contact: { title: '문의', subtitle: '질문, 피드백, 파트너십, 기능 요청 또는 기업용 계산기? 모두 읽습니다.', emailLabel: '이메일', businessLabel: '비즈니스', responseLabel: '응답', sendMessage: '메시지 보내기', headquarters: '본사' },
    privacy: { title: '개인정보 처리방침', effectiveDate: '발효일: 2026년 8월 · 최종 업데이트: 2026년 8월', whatWeCollect: '수집 정보', localStorage: '로컬 저장소', analytics: '분석', thirdParties: '서드파티', yourRights: '고객 권리' },
    terms: { title: '서비스 약관', effectiveDate: '발효일: 2026년 8월 · Real Calculator 365를 사용함으로써 이 약관에 동의한 것으로 간주됩니다.', useOfService: '서비스 사용', ip: '지적 재산권', noWarranty: '무 보증' },
    blog: { title: '블로그', subtitle: '계산기, 디자인, 수학을 쉽게 만드는 노트.', readMore: '자세히 보기', tagProduct: '제품', tagEngineering: '엔지니어링', tagAccessibility: '접근성' },
    pricing: { title: '가격', subtitle: '전체 120개 이상의 전문 계산기. 모든 기능. 완전 무료.', allCategories: '모든 카테고리 포함', faq: { title: '자주 묻는 질문' }, freeForever: '100% 영구 무료', noSignIn: '가입 불필요, 프리미엄 불필요 — 모든 광고로 운영 🎉' },
  },
};

// ============ ITALIAN DICTIONARY ============
const it: Dictionary = {
  metaTitle: 'Real Calculator 365 — Calcolatrici Online Gratuite per Finanze, Salute, Matematica e Altro',
  metaDescription:
    'Senza registrazione, senza premium, senza complicazioni — tutto gestito dalla pubblicità. Oltre 120 calcolatrici online gratuite per finanza, salute, scienza, matematica, ingegneria e altro. Veloci, precise e 100% gratuite per sempre.',
  nav: { finance: 'Finanze', health: 'Salute', math: 'Matematica', science: 'Scienza', engineering: 'Ingegneria', converters: 'Convertitori', all: 'Tutte le Calcolatrici', search: 'Cerca' },
  hero: {
    badge: 'Motore di Calcolo con IA',
    titleA: 'Calcola Tutto.',
    titleB: 'Istantaneamente.',
    subtitle: 'Calcolatrici IA e strumenti intelligenti per finanza, salute, scienza, ingegneria, affari e vita quotidiana. Usate da milioni di persone in tutto il mondo.',
    searchPlaceholder: 'Cerca calcolatrici... (es.: BMI, rata, interessi)',
    cta: 'Esplora Tutte le Calcolatrici',
  },
  categories: { title: 'Tutte le Calcolatrici che Ti Serviranno', subtitle: 'Oltre 120 calcolatrici di precisione in {n} categorie. Con IA e costruite per la velocità.', tools: 'strumenti' },
  categoryLabels: {
    finance: 'Finanze', health: 'Salute e Fitness', math: 'Matematica', science: 'Scienza', engineering: 'Ingegneria',
    'date-time': 'Data e Ora', education: 'Istruzione', conversion: 'Conversione', business: 'Affari e Contabilità', ai: 'Strumenti IA',
  },
  popular: { title: 'Le Più Popolari', subtitle: 'Usate da milioni ogni giorno', viewAll: 'Vedi Tutte' },
  ai: { badge: 'Con IA', title: 'Calcoli Smart. Analisi Intelligenti.', subtitle: 'Oltre la matematica di base — il nostro motore IA spiega, consiglia e insegna.' },
  trust: { title: 'Costruito per Prestazioni e Fiducia', subtitle: 'Infrastruttura di livello enterprise per calcoli istantanei e precisi in tutto il mondo.' },
  faq: { title: 'Domande Frequenti' },
  footer: { company: 'Azienda', copyright: 'Tutti i diritti riservati. Senza registrazione, senza premium, senza complicazioni — tutto gestito dalla pubblicità.' },
  calculators: {
    ...Object.fromEntries(Object.entries(calcLabels).map(([k, v]) => [k, { ...v, ...defaultCalcUI }])),
    'bmi': { label: 'Calcolatore BMI', description: 'Calcola il tuo Indice di Massa Corporea', button: 'Calcolare', result: { 'Your BMI': 'Il tuo BMI', 'Healthy Range': 'Intervallo Sano' }, inputs: { Weight: 'Peso', Height: 'Altezza' } },
    'age': { label: 'Calcolatore Età', description: 'Calcola la tua età esatta', button: 'Calcola Età', result: { 'Years': 'Anni', 'Months': 'Mesi', 'Days': 'Giorni', 'Total Days': 'Giorni Totali' }, inputs: { 'Date of Birth': 'Data di Nascita' } },
    'loan': { label: 'Calcolatore Prestiti', description: 'Calcola pagamenti e interessi del prestito', button: 'Calcolare', result: { 'Monthly Payment': 'Pagamento Mensile', 'Total Interest': 'Interesse Totale', 'Total Amount': 'Importo Totale' }, inputs: { 'Loan Amount': 'Importo Prestito', 'Interest Rate': 'Tasso di Interesse', 'Tenure': 'Durata' } },
    'sip': { label: 'Calcolatore SIP', description: 'Pianifica investimenti in fondi comuni', button: 'Calcolare Rendimenti', result: { 'Invested': 'Investito', 'Est. Returns': 'Rend. Stimat.', 'Total Value': 'Valore Totale' }, inputs: { 'Monthly Investment': 'Investimento Mensile', 'Expected Return Rate': 'Tasso di Rendimento Atteso', 'Time Period': 'Periodo' } },
    'emi': { label: 'Calcolatore EMI', description: 'Calcola rate mensili di prestiti', button: 'Calcolare EMI', result: { 'Monthly EMI': 'EMI Mensile', 'Total Interest': 'Interesse Totale', 'Total Amount': 'Importo Totale' }, inputs: { 'Loan Amount': 'Importo Prestito', 'Interest Rate': 'Tasso di Interesse', 'Loan Tenure': 'Durata Prestito' } },
    'percentage': { label: 'Calcolatore Percentuale', description: 'Calcoli rapidi di percentuale', button: 'Calcolare', result: { 'Result': 'Risultato' }, inputs: { 'First Number': 'Primo Numero', 'Second Number': 'Secondo Numero' } },
    'scientific': { label: 'Calcolatrice Scientifica', description: 'Funzioni scientifiche avanzate', button: '=', result: {}, inputs: {} },
    'calorie': { label: 'Calcolatore Calorie', description: 'Calcola il tuo fabbisogno calorico giornaliero', button: 'Calcolare Calorie', result: { 'Maintain Weight': 'Mantenere Peso', 'Lose Weight': 'Perdere Peso', 'Gain Weight': 'Aumentare Peso' }, inputs: { Gender: 'Genere', Age: 'Età', Weight: 'Peso', Height: 'Altezza', "Activity Level": 'Livello Attività' } },
    'compound-interest': { label: 'Calcolatore Interesse Composto', description: 'Calcola la crescita dell\'interesse composto', button: 'Calcolare', result: { 'Total Amount': 'Importo Totale', 'Total Interest Earned': 'Interesse Totale Guadagnato' }, inputs: { 'Principal Amount': 'Capitale', 'Annual Rate': 'Tasso Annuo', 'Time': 'Tempo', 'Compounding Frequency': 'Frequenza Capitalizzazione' } },
    'gpa': { label: 'Calcolatore GPA', description: 'Calcola la media dei voti', button: 'Calcolare GPA', result: { 'Your GPA': 'Il tuo GPA' }, inputs: { Course: 'Corso', Credits: 'Crediti', Grade: 'Voto' } },
    'period-tracker': { label: 'Tracciatore Ciclo', description: 'Monitora il ciclo e prevedi i periodi', button: 'Prevedi il Mio Ciclo', result: { 'Next Period': 'Prossimo Periodo', 'Ovulation': 'Ovulazione', 'Fertile Window': 'Finestra Fertile' }, inputs: { 'Last Period': 'Ultimo Periodo', 'Cycle Length': 'Lunghezza Ciclo', 'Period Length': 'Lunghezza Periodo' } },
  },
  calcLabels: { 'bmi': { label: 'BMI Calculator', description: 'Calculate Body Mass Index' }, 'age': { label: 'Age Calculator', description: 'Calculate exact age' }, 'loan': { label: 'Loan Calculator', description: 'Calculate loan payments & interest' }, 'sip': { label: 'SIP Calculator', description: 'Plan mutual fund investments' }, 'emi': { label: 'EMI Calculator', description: 'Calculate monthly loan installments' }, 'percentage': { label: 'Percentage Calculator', description: 'Quick percentage calculations' }, 'scientific': { label: 'Scientific Calculator', description: 'Advanced scientific functions' }, 'calorie': { label: 'Calorie Calculator', description: 'Calculate daily calorie needs' }, 'compound-interest': { label: 'Compound Interest Calculator', description: 'Calculate compound interest growth' }, 'mortgage': { label: 'Mortgage Calculator', description: 'Calculate mortgage payments' }, 'roi': { label: 'ROI Calculator', description: 'Calculate return on investment' }, 'gst': { label: 'GST Calculator', description: 'Calculate GST amounts' }, 'tax': { label: 'Tax Calculator', description: 'Estimate progressive tax & deductions' }, 'salary': { label: 'Salary Calculator', description: 'Calculate gross, net & monthly salary' }, 'profit-margin': { label: 'Profit Margin Calculator', description: 'Calculate profit margin & markup' }, 'simple-interest': { label: 'Simple Interest Calculator', description: 'Calculate simple interest' }, 'inflation': { label: 'Inflation Calculator', description: 'Calculate inflation impact on money' }, 'retirement': { label: 'Retirement Calculator', description: 'Plan your retirement corpus' }, 'currency': { label: 'Currency Converter', description: 'Convert between world currencies' } },
  calcResults: {},
  calcInputs: {},
  calcButtons: {},
  pages: {
    about: { title: 'Chi Siamo Real Calculator 365', subtitle: 'Un moderno sistema operativo di calcolo per tutti.', mission: 'I calcoli affidabili dovrebbero essere veloci, comprensibili, visivi e accessibili a tutti a livello globale.', howItWorks: 'Come Funziona', noAccount: 'Nessun account richiesto — apri qualsiasi calcolatrice e inizia immediatamente.', instantResults: 'I risultati vengono calcolati in tempo reale mentre digiti, trascini o selezioni opzioni.', privacyFirst: 'Cronologia e preferiti sono salvati localmente nel tuo browser.', globalAccess: 'Tutte le calcolatrici sono gratuite per sempre; nessun blocco di funzioni o livelli nascosti.' },
    contact: { title: 'Contatti', subtitle: 'Domande, feedback, partnership, richieste di funzionalità o calcolatrici aziendali? Leggiamo tutto.', emailLabel: 'Email', businessLabel: 'Business', responseLabel: 'Risposta', sendMessage: 'Invia Messaggio', headquarters: 'Sede' },
    privacy: { title: 'Informativa Privacy', effectiveDate: 'Data di efficacia: agosto 2026 · Ultimo aggiornamento: agosto 2026', whatWeCollect: 'Cosa Raccogliamo', localStorage: 'Memoria Locale', analytics: 'Analisi', thirdParties: 'Terze Parti', yourRights: 'I Tuoi Diritti' },
    terms: { title: 'Termini di Servizio', effectiveDate: 'Data di efficacia: agosto 2026 · Utilizzando Real Calculator 365, accetti questi termini.', useOfService: 'Uso del Servizio', ip: 'Proprietà Intellettuale', noWarranty: 'Senza Garanzia' },
    blog: { title: 'Blog', subtitle: 'Note su calcolatrici, design e rendere la matematica facile.', readMore: 'Leggi di più', tagProduct: 'Prodotto', tagEngineering: 'Ingegneria', tagAccessibility: 'Accessibilità' },
    pricing: { title: 'Prezzi', subtitle: 'Tutte le 120+ calcolatrici professionali. Tutte le funzioni. Completamente gratuite.', allCategories: 'Tutte le Categorie Incluse', faq: { title: 'Domande Frequenti' }, freeForever: '100% Gratuito Per Sempre', noSignIn: 'Nessuna registrazione, nessun premium, nessun problema — tutto gestito dalla pubblicità 🎉' },
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, es, ja, fr, de, pt, ko, it };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

// Interpolate '{n}'-style placeholders.
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
