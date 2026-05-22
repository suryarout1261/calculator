'use client';

import { useState } from 'react';

const buttons = [
  ['sin', 'cos', 'tan', 'π', 'e'],
  ['(', ')', '^', '√', 'log'],
  ['7', '8', '9', '÷', 'ln'],
  ['4', '5', '6', '×', '!'],
  ['1', '2', '3', '-', '%'],
  ['0', '.', 'EXP', '+', '='],
  ['C', '⌫', '±', 'Ans', 'AC'],
];

export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastAnswer, setLastAnswer] = useState(0);

  const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);

  const handlePress = (btn: string) => {
    switch (btn) {
      case 'AC': setDisplay('0'); setExpression(''); break;
      case 'C': setDisplay('0'); setExpression(''); break;
      case '⌫': setExpression((e) => e.slice(0, -1) || ''); setDisplay((d) => d.slice(0, -1) || '0'); break;
      case '=': {
        try {
          let expr = expression || display;
          expr = expr.replace(/π/g, `(${Math.PI})`).replace(/e(?![x])/g, `(${Math.E})`)
            .replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(').replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(')
            .replace(/√\(/g, 'Math.sqrt(').replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/');
          expr = expr.replace(/(\d+)!/g, (_, n) => String(factorial(parseInt(n))));
          const result = Function('"use strict"; return (' + expr + ')')();
          setDisplay(String(Math.round(result * 1e10) / 1e10));
          setLastAnswer(result);
          setExpression('');
        } catch {
          setDisplay('Error');
        }
        break;
      }
      case 'Ans': setExpression((e) => e + String(lastAnswer)); setDisplay((d) => (d === '0' ? '' : d) + String(lastAnswer)); break;
      case '±': setDisplay((d) => d.startsWith('-') ? d.slice(1) : '-' + d); break;
      case 'sin': case 'cos': case 'tan': case 'log': case 'ln': case '√':
        setExpression((e) => e + btn + '('); setDisplay((d) => (d === '0' ? '' : d) + btn + '('); break;
      case 'π': case 'e':
        setExpression((e) => e + btn); setDisplay((d) => (d === '0' ? '' : d) + btn); break;
      default:
        if (display === '0' && btn !== '.') {
          setDisplay(btn); setExpression(btn);
        } else {
          setDisplay((d) => d + btn); setExpression((e) => e + btn);
        }
    }
  };

  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <div className="bg-brand-black text-white rounded-xl p-4 mb-4">
        <p className="text-xs text-gray-400 h-5 text-right font-mono">{expression}</p>
        <p className="text-3xl font-mono text-right font-bold truncate">{display}</p>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {buttons.flat().map((btn, i) => (
          <button
            key={`${btn}-${i}`}
            onClick={() => handlePress(btn)}
            className={`p-3 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
              btn === '=' ? 'bg-brand-sapphire text-white' :
              btn === 'AC' || btn === 'C' ? 'bg-red-500/10 text-red-500' :
              /^[0-9.]$/.test(btn) ? 'bg-gray-100 hover:bg-gray-200' :
              'bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
