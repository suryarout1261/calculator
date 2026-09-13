'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useAppStore, CALCULATORS } from '@/lib/store';
import { Heart, Share2, Download, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  calculatorId: string;
  children: React.ReactNode;
  result?: Record<string, string | number> | null;
  inputs?: Record<string, string | number>;
}

export function CalculatorActions({
  calculatorId, children, result, inputs }: Props) {
  const { locale, dict } = useI18n();
  const { toggleFavorite, favorites, addToHistory } = useAppStore();
  const calc = CALCULATORS.find((c) => c.id === calculatorId);
  const isFav = favorites.includes(calculatorId);

  const handleSaveResult = () => {
    if (!calc || !result || !inputs) return;
    addToHistory({ calculatorId, calculatorTitle: calc.title, inputs, result });
    toast.success('Saved to history!');
  };

  const handleCopy = () => {
    if (!result) return;
    const text = Object.entries(result).map(([k, v]) => `${k}: ${v}`).join('\n');
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: calc?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  const handleExport = () => {
    if (!result || !inputs) return;
    const data = `${calc?.title}\n\nInputs:\n${Object.entries(inputs).map(([k,v]) => `${k}: ${v}`).join('\n')}\n\nResults:\n${Object.entries(result).map(([k,v]) => `${k}: ${v}`).join('\n')}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${calculatorId}-result.txt`; a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported successfully!');
  };

  return (
    <div>
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => toggleFavorite(calculatorId)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            isFav
              ? 'bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
          {isFav ? 'Favorited' : 'Favorite'}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>

        {result && (
          <>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>

            <button
              onClick={handleSaveResult}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-brand-sapphire/10 dark:bg-brand-sapphire/20 text-brand-sapphire hover:bg-brand-sapphire/20 dark:hover:bg-brand-sapphire/30 transition-all duration-200"
            >
              Save Result
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-brand-gold/10 dark:bg-brand-gold/20 text-brand-gold hover:bg-brand-gold/20 dark:hover:bg-brand-gold/30 transition-all duration-200"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </>
        )}
      </div>
      {children}
    </div>
  );
}
