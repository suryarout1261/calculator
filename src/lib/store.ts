import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============ CALCULATOR DATA REGISTRY ============
export interface CalculatorMeta {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  tags: string[];
  icon?: string;
}

export const CALCULATORS: CalculatorMeta[] = [
  // Finance
  { id: 'emi', title: 'EMI Calculator', description: 'Calculate monthly loan installments', href: '/emi-calculator', category: 'finance', tags: ['emi', 'loan', 'installment', 'mortgage', 'home loan'] },
  { id: 'sip', title: 'SIP Calculator', description: 'Plan mutual fund investments', href: '/sip-calculator', category: 'finance', tags: ['sip', 'mutual fund', 'investment', 'systematic'] },
  { id: 'compound-interest', title: 'Compound Interest Calculator', description: 'Calculate compound interest growth', href: '/compound-interest-calculator', category: 'finance', tags: ['compound', 'interest', 'investment', 'growth'] },
  { id: 'loan', title: 'Loan Calculator', description: 'Calculate loan payments & interest', href: '/loan-calculator', category: 'finance', tags: ['loan', 'payment', 'interest', 'bank'] },
  { id: 'mortgage', title: 'Mortgage Calculator', description: 'Calculate mortgage payments', href: '/mortgage-calculator', category: 'finance', tags: ['mortgage', 'home', 'house', 'property'] },
  { id: 'roi', title: 'ROI Calculator', description: 'Calculate return on investment', href: '/roi-calculator', category: 'finance', tags: ['roi', 'return', 'investment', 'profit'] },
  { id: 'gst', title: 'GST Calculator', description: 'Calculate GST amounts', href: '/gst-calculator', category: 'finance', tags: ['gst', 'tax', 'goods', 'services'] },
  { id: 'tax', title: 'Tax Calculator', description: 'Estimate progressive tax & deductions', href: '/tax-calculator', category: 'finance', tags: ['tax', 'income tax', 'deductions', 'slabs'] },
  { id: 'salary', title: 'Salary Calculator', description: 'Calculate gross, net & monthly salary', href: '/salary-calculator', category: 'finance', tags: ['salary', 'ctc', 'income', 'monthly', 'pay'] },
  { id: 'profit-margin', title: 'Profit Margin Calculator', description: 'Calculate profit margin & markup', href: '/profit-margin-calculator', category: 'finance', tags: ['profit', 'margin', 'markup', 'business'] },
  { id: 'simple-interest', title: 'Simple Interest Calculator', description: 'Calculate simple interest', href: '/simple-interest-calculator', category: 'finance', tags: ['simple', 'interest', 'principal'] },
  { id: 'inflation', title: 'Inflation Calculator', description: 'Calculate inflation impact on money', href: '/inflation-calculator', category: 'finance', tags: ['inflation', 'price', 'future value'] },
  { id: 'retirement', title: 'Retirement Calculator', description: 'Plan your retirement corpus', href: '/retirement-calculator', category: 'finance', tags: ['retirement', 'savings', 'pension', 'future'] },
  { id: 'currency', title: 'Currency Converter', description: 'Convert between world currencies', href: '/currency-converter', category: 'finance', tags: ['currency', 'exchange', 'forex', 'dollar', 'rupee'] },
  { id: 'credit-card', title: 'Credit Card Payoff Calculator', description: 'Plan credit card debt payoff', href: '/credit-card-calculator', category: 'finance', tags: ['credit card', 'debt', 'payoff', 'interest'] },
  { id: 'break-even', title: 'Break-even Calculator', description: 'Find business break-even point', href: '/break-even-calculator', category: 'finance', tags: ['break-even', 'business', 'cost', 'revenue'] },
  { id: 'investment-return', title: 'Investment Return Calculator', description: 'Calculate total investment returns', href: '/investment-return-calculator', category: 'finance', tags: ['investment', 'return', 'cagr', 'growth'] },

  // Health & Fitness
  { id: 'bmi', title: 'BMI Calculator', description: 'Calculate Body Mass Index', href: '/bmi-calculator', category: 'health', tags: ['bmi', 'body', 'mass', 'index', 'weight', 'height'] },
  { id: 'bmr', title: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate', href: '/bmr-calculator', category: 'health', tags: ['bmr', 'basal', 'metabolic', 'rate', 'calories'] },
  { id: 'calorie', title: 'Calorie Calculator', description: 'Calculate daily calorie needs', href: '/calorie-calculator', category: 'health', tags: ['calorie', 'food', 'diet', 'nutrition', 'tdee'] },
  { id: 'body-fat', title: 'Body Fat Calculator', description: 'Estimate body fat percentage', href: '/body-fat-calculator', category: 'health', tags: ['body fat', 'percentage', 'fitness'] },
  { id: 'water-intake', title: 'Water Intake Calculator', description: 'Calculate daily water needs', href: '/water-intake-calculator', category: 'health', tags: ['water', 'hydration', 'intake', 'daily'] },
  { id: 'protein', title: 'Protein Calculator', description: 'Calculate daily protein needs', href: '/protein-calculator', category: 'health', tags: ['protein', 'muscle', 'nutrition', 'daily'] },
  { id: 'tdee', title: 'TDEE Calculator', description: 'Total Daily Energy Expenditure', href: '/tdee-calculator', category: 'health', tags: ['tdee', 'energy', 'expenditure', 'calories', 'daily'] },
  { id: 'ideal-weight', title: 'Ideal Weight Calculator', description: 'Find your ideal body weight', href: '/ideal-weight-calculator', category: 'health', tags: ['ideal', 'weight', 'healthy'] },
  { id: 'pregnancy', title: 'Pregnancy Calculator', description: 'Calculate due date & milestones', href: '/pregnancy-calculator', category: 'health', tags: ['pregnancy', 'due date', 'baby', 'trimester'] },
  { id: 'heart-rate', title: 'Heart Rate Zone Calculator', description: 'Find your target heart rate zones', href: '/heart-rate-calculator', category: 'health', tags: ['heart rate', 'cardio', 'zone', 'training'] },
  { id: 'macro', title: 'Macro Calculator', description: 'Calculate daily macronutrient split', href: '/macro-calculator', category: 'health', tags: ['macro', 'protein', 'carbs', 'fat', 'nutrition'] },
  { id: 'sleep-cycle', title: 'Sleep Cycle Calculator', description: 'Optimize your sleep schedule', href: '/sleep-cycle-calculator', category: 'health', tags: ['sleep', 'cycle', 'rem', 'wake', 'bedtime'] },
  { id: 'period-tracker', title: 'Period Tracker', description: 'Track cycle, predict periods & fertility', href: '/period-tracker', category: 'health', tags: ['period', 'cycle', 'menstrual', 'fertility', 'ovulation'] },
  { id: 'ovulation', title: 'Ovulation Calculator', description: 'Predict ovulation & fertility window', href: '/ovulation-calculator', category: 'health', tags: ['ovulation', 'fertility', 'cycle', 'conceive'] },

  // Math
  { id: 'percentage', title: 'Percentage Calculator', description: 'Quick percentage calculations', href: '/percentage-calculator', category: 'math', tags: ['percentage', 'percent', '%', 'ratio'] },
  { id: 'scientific', title: 'Scientific Calculator', description: 'Advanced scientific functions', href: '/scientific-calculator', category: 'math', tags: ['scientific', 'sin', 'cos', 'tan', 'log', 'advanced'] },
  { id: 'fraction', title: 'Fraction Calculator', description: 'Add, subtract, multiply fractions', href: '/fraction-calculator', category: 'math', tags: ['fraction', 'numerator', 'denominator'] },
  { id: 'algebra', title: 'Algebra Solver', description: 'Solve algebraic equations', href: '/algebra-solver', category: 'math', tags: ['algebra', 'equation', 'solve', 'x', 'variable'] },
  { id: 'matrix', title: 'Matrix Calculator', description: 'Matrix operations & determinants', href: '/matrix-calculator', category: 'math', tags: ['matrix', 'determinant', 'inverse', 'multiply'] },
  { id: 'probability', title: 'Probability Calculator', description: 'Calculate probabilities', href: '/probability-calculator', category: 'math', tags: ['probability', 'chance', 'odds', 'statistics'] },
  { id: 'statistics', title: 'Statistics Calculator', description: 'Mean, median, mode, std deviation', href: '/statistics-calculator', category: 'math', tags: ['statistics', 'mean', 'median', 'mode', 'std'] },
  { id: 'geometry', title: 'Geometry Calculator', description: 'Area, perimeter, volume of shapes', href: '/geometry-calculator', category: 'math', tags: ['geometry', 'area', 'perimeter', 'volume', 'circle'] },
  { id: 'trigonometry', title: 'Trigonometry Calculator', description: 'Sin, cos, tan & triangle solver', href: '/trigonometry-calculator', category: 'math', tags: ['trigonometry', 'sin', 'cos', 'tan', 'angle', 'triangle'] },

  // Science
  { id: 'unit-converter', title: 'Unit Converter', description: 'Convert between units', href: '/unit-converter', category: 'science', tags: ['unit', 'convert', 'length', 'weight', 'temperature'] },
  { id: 'force', title: 'Force Calculator', description: 'Calculate force (F=ma)', href: '/force-calculator', category: 'science', tags: ['force', 'mass', 'acceleration', 'newton', 'physics'] },
  { id: 'velocity', title: 'Velocity Calculator', description: 'Calculate speed & velocity', href: '/velocity-calculator', category: 'science', tags: ['velocity', 'speed', 'distance', 'time'] },
  { id: 'density', title: 'Density Calculator', description: 'Calculate mass/volume density', href: '/density-calculator', category: 'science', tags: ['density', 'mass', 'volume', 'physics'] },
  { id: 'ohms-law', title: "Ohm's Law Calculator", description: 'Voltage, current, resistance', href: '/ohms-law-calculator', category: 'science', tags: ['ohm', 'voltage', 'current', 'resistance', 'electrical'] },
  { id: 'energy', title: 'Energy Calculator', description: 'Calculate kinetic & potential energy', href: '/energy-calculator', category: 'science', tags: ['energy', 'kinetic', 'potential', 'joule', 'physics'] },
  { id: 'pressure', title: 'Pressure Calculator', description: 'Calculate pressure from force/area', href: '/pressure-calculator', category: 'science', tags: ['pressure', 'force', 'area', 'pascal', 'physics'] },
  { id: 'molarity', title: 'Molarity Calculator', description: 'Calculate solution concentration', href: '/molarity-calculator', category: 'science', tags: ['molarity', 'chemistry', 'moles', 'concentration', 'solution'] },

  // Engineering
  { id: 'voltage-drop', title: 'Voltage Drop Calculator', description: 'Calculate voltage drop in cables', href: '/voltage-drop-calculator', category: 'engineering', tags: ['voltage', 'drop', 'cable', 'wire', 'electrical'] },
  { id: 'concrete', title: 'Concrete Calculator', description: 'Estimate concrete volume needed', href: '/concrete-calculator', category: 'engineering', tags: ['concrete', 'volume', 'construction', 'cement'] },
  { id: 'pipe-flow', title: 'Pipe Flow Calculator', description: 'Calculate flow rate in pipes', href: '/pipe-flow-calculator', category: 'engineering', tags: ['pipe', 'flow', 'rate', 'fluid', 'hydraulic'] },
  { id: 'hvac', title: 'HVAC Calculator', description: 'Calculate heating & cooling loads', href: '/hvac-calculator', category: 'engineering', tags: ['hvac', 'heating', 'cooling', 'btu', 'air'] },
  { id: 'construction', title: 'Construction Estimator', description: 'Estimate construction materials', href: '/construction-estimator', category: 'engineering', tags: ['construction', 'estimate', 'materials', 'building'] },

  // Date & Time
  { id: 'age', title: 'Age Calculator', description: 'Calculate exact age', href: '/age-calculator', category: 'date-time', tags: ['age', 'birthday', 'years', 'months', 'days', 'date'] },
  { id: 'date-difference', title: 'Date Difference Calculator', description: 'Days between two dates', href: '/date-difference-calculator', category: 'date-time', tags: ['date', 'difference', 'days', 'between'] },
  { id: 'working-days', title: 'Working Days Calculator', description: 'Count business days', href: '/working-days-calculator', category: 'date-time', tags: ['working', 'business', 'days', 'weekdays'] },
  { id: 'time-zone', title: 'Time Zone Converter', description: 'Convert time across zones', href: '/time-zone-converter', category: 'date-time', tags: ['time zone', 'convert', 'utc', 'gmt', 'ist'] },

  // Education
  { id: 'gpa', title: 'GPA Calculator', description: 'Calculate grade point average', href: '/gpa-calculator', category: 'education', tags: ['gpa', 'grade', 'point', 'average', 'college'] },
  { id: 'cgpa', title: 'CGPA Calculator', description: 'Calculate cumulative GPA', href: '/cgpa-calculator', category: 'education', tags: ['cgpa', 'cumulative', 'grade', 'semester'] },
  { id: 'attendance', title: 'Attendance Calculator', description: 'Track & predict attendance %', href: '/attendance-calculator', category: 'education', tags: ['attendance', 'classes', 'percentage', 'college'] },
  { id: 'exam-score', title: 'Exam Score Predictor', description: 'Predict final exam grades', href: '/exam-score-predictor', category: 'education', tags: ['exam', 'score', 'grade', 'predict', 'marks'] },

  // Conversion
  { id: 'length', title: 'Length Converter', description: 'Convert length units', href: '/length-converter', category: 'conversion', tags: ['length', 'meter', 'feet', 'inch', 'cm', 'km', 'mile'] },
  { id: 'weight', title: 'Weight Converter', description: 'Convert weight units', href: '/weight-converter', category: 'conversion', tags: ['weight', 'kg', 'pound', 'ounce', 'gram', 'ton'] },
  { id: 'temperature', title: 'Temperature Converter', description: 'Convert temperature units', href: '/temperature-converter', category: 'conversion', tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin'] },
  { id: 'area', title: 'Area Converter', description: 'Convert area units', href: '/area-converter', category: 'conversion', tags: ['area', 'sqft', 'sqm', 'acre', 'hectare'] },
  { id: 'volume', title: 'Volume Converter', description: 'Convert volume units', href: '/volume-converter', category: 'conversion', tags: ['volume', 'liter', 'gallon', 'ml', 'cubic'] },
  { id: 'speed', title: 'Speed Converter', description: 'Convert speed units', href: '/speed-converter', category: 'conversion', tags: ['speed', 'kmph', 'mph', 'knots', 'mps'] },
  { id: 'data-storage', title: 'Data Storage Converter', description: 'Convert bytes, MB, GB, TB', href: '/data-storage-converter', category: 'conversion', tags: ['data', 'storage', 'bytes', 'mb', 'gb', 'tb'] },

  // Business & Accounting
  { id: 'depreciation', title: 'Depreciation Calculator', description: 'Calculate asset depreciation', href: '/depreciation-calculator', category: 'business', tags: ['depreciation', 'asset', 'straight-line', 'declining'] },
  { id: 'payroll', title: 'Payroll Calculator', description: 'Calculate employee payroll', href: '/payroll-calculator', category: 'business', tags: ['payroll', 'salary', 'employee', 'deductions'] },
  { id: 'revenue-growth', title: 'Revenue Growth Calculator', description: 'Calculate revenue growth rate', href: '/revenue-growth-calculator', category: 'business', tags: ['revenue', 'growth', 'rate', 'yoy'] },
  { id: 'ebitda', title: 'EBITDA Calculator', description: 'Calculate EBITDA & margins', href: '/ebitda-calculator', category: 'business', tags: ['ebitda', 'earnings', 'operating', 'margin'] },

  // AI Tools
  { id: 'ai-equation', title: 'AI Equation Solver', description: 'AI-powered equation solving', href: '/ai-equation-solver', category: 'ai', tags: ['ai', 'equation', 'solver', 'intelligent', 'step'] },
  { id: 'ai-finance', title: 'AI Finance Advisor', description: 'AI financial insights & advice', href: '/ai-finance-advisor', category: 'ai', tags: ['ai', 'finance', 'advisor', 'insight', 'investment'] },
  { id: 'ai-health', title: 'AI Health Insights', description: 'AI-powered health recommendations', href: '/ai-health-insights', category: 'ai', tags: ['ai', 'health', 'recommendation', 'fitness'] },
  { id: 'ai-tutor', title: 'AI Math Tutor', description: 'Interactive AI math tutoring', href: '/ai-math-tutor', category: 'ai', tags: ['ai', 'math', 'tutor', 'learn', 'teach', 'explain'] },
  { id: 'ai-budget', title: 'AI Budget Planner', description: 'Smart budget recommendations', href: '/ai-budget-planner', category: 'ai', tags: ['ai', 'budget', 'planner', 'expense', 'savings'] },
  { id: 'ai-calorie', title: 'AI Calorie Planner', description: 'AI-optimized meal calorie planning', href: '/ai-calorie-planner', category: 'ai', tags: ['ai', 'calorie', 'meal', 'plan', 'diet'] },
];

export const CATEGORIES = [
  { id: 'finance', label: 'Finance', href: '/category/finance', count: CALCULATORS.filter(c => c.category === 'finance').length },
  { id: 'health', label: 'Health & Fitness', href: '/category/health', count: CALCULATORS.filter(c => c.category === 'health').length },
  { id: 'math', label: 'Math', href: '/category/math', count: CALCULATORS.filter(c => c.category === 'math').length },
  { id: 'science', label: 'Science', href: '/category/science', count: CALCULATORS.filter(c => c.category === 'science').length },
  { id: 'engineering', label: 'Engineering', href: '/category/engineering', count: CALCULATORS.filter(c => c.category === 'engineering').length },
  { id: 'date-time', label: 'Date & Time', href: '/category/date-time', count: CALCULATORS.filter(c => c.category === 'date-time').length },
  { id: 'education', label: 'Education', href: '/category/education', count: CALCULATORS.filter(c => c.category === 'education').length },
  { id: 'conversion', label: 'Conversion', href: '/category/conversion', count: CALCULATORS.filter(c => c.category === 'conversion').length },
  { id: 'business', label: 'Business & Accounting', href: '/category/business', count: CALCULATORS.filter(c => c.category === 'business').length },
  { id: 'ai', label: 'AI Tools', href: '/category/ai', count: CALCULATORS.filter(c => c.category === 'ai').length },
];

// ============ SEARCH STORE ============
interface SearchState {
  query: string;
  isOpen: boolean;
  recentSearches: string[];
  setQuery: (q: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  addRecentSearch: (q: string) => void;
  clearRecent: () => void;
  getResults: () => CalculatorMeta[];
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      isOpen: false,
      recentSearches: [],
      setQuery: (q) => set({ query: q }),
      openSearch: () => set({ isOpen: true }),
      closeSearch: () => set({ isOpen: false, query: '' }),
      addRecentSearch: (q) => {
        if (!q.trim()) return;
        set((s) => ({
          recentSearches: [q, ...s.recentSearches.filter((r) => r !== q)].slice(0, 10),
        }));
      },
      clearRecent: () => set({ recentSearches: [] }),
      getResults: () => {
        const q = get().query.toLowerCase().trim();
        if (!q) return [];
        return CALCULATORS.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.tags.some((t) => t.includes(q)) ||
            c.category.includes(q)
        ).slice(0, 12);
      },
    }),
    { name: 'realcalculator365-search', partialize: (s) => ({ recentSearches: s.recentSearches }) }
  )
);

// ============ CALCULATOR HISTORY / FAVORITES STORE ============
export interface CalculationRecord {
  id: string;
  calculatorId: string;
  calculatorTitle: string;
  inputs: Record<string, string | number>;
  result: Record<string, string | number>;
  timestamp: number;
}

interface AppState {
  favorites: string[];
  history: CalculationRecord[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToHistory: (record: Omit<CalculationRecord, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      history: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),
      addToHistory: (record) =>
        set((s) => ({
          history: [
            { ...record, id: crypto.randomUUID(), timestamp: Date.now() },
            ...s.history,
          ].slice(0, 100),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'realcalculator365-app' }
  )
);

// ============ LOCALE / LANGUAGE STORE ============
interface LocaleState {
  locale: 'en' | 'es' | 'ja' | 'fr' | 'de' | 'pt' | 'ko' | 'it';
  setLocale: (locale: LocaleState['locale']) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'realcalculator365-locale' }
  )
);


