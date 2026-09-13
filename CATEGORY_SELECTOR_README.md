# Category Selector Component

A modern two-level category navigation system with Apple-like fluid motion and animations.

## 🎯 Features

- **Two-Level Navigation**: Parent categories → Sub-calculators
- **Fluid Animations**: 200-300ms transitions with spring physics (stiffness: 420, damping: 34)
- **Apple-like Motion**: Uses `motion.layoutId` pills for shared element transitions
- **Mobile Optimized**: Horizontal scrolling with hidden scrollbars (still touch-scrollable)
- **Dark Mode Ready**: Seamless theme support with glassmorphism effects
- **Data-Driven**: Automatically syncs with CALCULATORS registry
- **No Page Reload**: Renders selected calculator inline using CalculatorRenderer
- **Fully Accessible**: ARIA roles, keyboard navigation, focus states

## 📦 Files Created

```
src/components/CategorySelector.tsx          # Main component
src/app/category-selector-demo/page.tsx      # Demo page
src/app/globals.css                          # Added scrollbar-hide utility
```

## 🚀 Usage

### Basic Usage

```tsx
import { CategorySelector } from '@/components/CategorySelector';

export default function MyPage() {
  return <CategorySelector />;
}
```

### With Custom Callback

```tsx
<CategorySelector
  onCalculatorSelect={(calc) => {
    console.log('Selected:', calc.title, calc.href);
    // Custom logic here
  }}
  defaultCategory="finance"
  renderCalculator={true}
/>
```

## 🎨 Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Level 1: Parent Categories (horizontal scroll)              │
│ [ Mathematics ] [ Finance ] [ Health ] [ Date & Time ] ...  │
└─────────────────────────────────────────────────────────────┘
         ↓ (Smooth slide transition on category change)
┌─────────────────────────────────────────────────────────────┐
│ Level 2: Sub-Calculators (horizontal scroll)                │
│ [ EMI ] [ Loan ] [ Mortgage ] [ Interest ] [ SIP ] ...      │
└─────────────────────────────────────────────────────────────┘
         ↓ (Fade in/out on calculator selection)
┌─────────────────────────────────────────────────────────────┐
│ Selected Calculator Renders Here (CalculatorRenderer)       │
│ (Full functional calculator with inputs and results)        │
└─────────────────────────────────────────────────────────────┘
```

## 🎭 Animation Details

### Level 1 (Parent Categories)
- **Active Indicator**: Gradient pill (sapphire → indigo)
- **Transition**: Spring physics (`layoutId="category-pill"`)
- **Timing**: ~250ms settle time
- **Visual**: Shadow-lg, white text, gradient background

### Level 2 (Sub-Calculators)
- **Container**: Slides in from right (x: 24 → 0)
- **Active Indicator**: Gold pill (`layoutId="calculator-pill"`)
- **Transition**: Spring physics (faster than level 1)
- **Timing**: 250ms slide + independent pill spring

### Calculator Display
- **Entry**: Fade + slight upward slide (y: 12 → 0)
- **Exit**: Fade + slight downward slide (y: 0 → -8)
- **Timing**: 250ms ease-in-out

## 🎨 Styling

Uses your existing design tokens:
- `brand-sapphire`: #0F52BA
- `brand-indigo`: #1F1F4D
- `brand-gold`: #C47A2C
- `glass-card`: Existing glassmorphism utility

Dark mode automatically adapts via `dark:` variants.

## 🔧 Configuration

The component is data-driven via `PARENT_CATEGORIES` defined internally:

```typescript
const PARENT_CATEGORIES: ParentCategory[] = [
  {
    id: 'mathematics',
    label: 'Mathematics',
    subcategories: CALCULATORS.filter(c => c.category === 'math')...
  },
  // ... more categories
];
```

To add a new category, just add calculators to the registry in `@/lib/store` — the component updates automatically.

## 📱 Mobile Behavior

- Horizontal scrolling enabled on both levels
- Scrollbars hidden via `scrollbar-hide` utility
- Touch/trackpad scrolling works perfectly
- No snap points (smooth free scroll)
- Buttons have `shrink-0` to prevent compression

## ♿ Accessibility

- `role="tablist"` and `role="tab"` for semantic structure
- `aria-selected` reflects active state
- `aria-label` describes each level
- `focus-visible:outline-2` for keyboard navigation
- Color contrast meets WCAG AA standards

## 🎬 Demo Page

Visit `/category-selector-demo` to see:
- Live component with all features
- Feature grid explaining benefits
- Implementation code snippet
- Full dark mode support

## 🧪 Testing

The component was verified with:
- TypeScript compilation: ✅ No errors
- Production build: ✅ Static page generated
- Runtime test: ✅ All categories render
- Dark mode: ✅ Styles adapt correctly

## 🔗 Integration Points

### With Existing Code
- Uses `CALCULATORS` from `@/lib/store`
- Renders calculators via `CalculatorRenderer` from `@/app/[slug]/CalculatorRenderer`
- Follows existing naming conventions (strips " Calculator", " Converter", etc.)
- Matches your design system (glass-card, btn-primary, font-display)

### No Breaking Changes
- All existing routes work unchanged
- Existing components untouched
- Only additions: 1 component + 1 demo page + 1 CSS utility

## 📊 Category Mapping

| Parent ID | Label | Source Categories |
|-----------|-------|------------------|
| `mathematics` | Mathematics | `math` |
| `finance` | Finance | `finance` |
| `health` | Health | `health` |
| `date-time` | Date & Time | `date-time` |
| `conversions` | Conversions | `conversion` |

## 🎯 Props API

```typescript
interface CategorySelectorProps {
  /** Called when a sub-calculator is selected (no page navigation). */
  onCalculatorSelect?: (calc: SubCalculator) => void;
  
  /** Initially active parent category id. Default: 'mathematics' */
  defaultCategory?: string;
  
  /** Render the selected calculator below the selector. Default: true */
  renderCalculator?: boolean;
}
```

## 💡 Tips

1. **Custom Navigation**: Set `renderCalculator={false}` and use `onCalculatorSelect` to handle routing yourself
2. **Pre-select Category**: Pass `defaultCategory="finance"` to start on a specific category
3. **Mobile First**: Component is touch-optimized — test on real devices for best feel
4. **Performance**: Uses `AnimatePresence` mode="wait" to prevent layout thrash
5. **Extensibility**: Add more parent categories by editing `PARENT_CATEGORIES` array

## 🚦 Next Steps

To use this in your app:
1. Import `<CategorySelector />` into any page
2. Optional: Pass props to customize behavior
3. Style overrides: Use Tailwind classes via className (not exposed yet — wrap if needed)
4. Analytics: Hook `onCalculatorSelect` to track interactions

---

**Built with**: Next.js 16, React 19, Framer Motion 12, TypeScript 6, Tailwind CSS 4
