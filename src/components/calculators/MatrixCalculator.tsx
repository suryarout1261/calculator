'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { CalculatorActions } from '@/components/calculators/CalculatorActions';
import { useI18n } from '@/components/LocaleProvider';

type Matrix = number[][];

function createMatrix(rows: number, cols: number, fill = 0): Matrix {
  return Array.from({ length: rows }, () => Array(cols).fill(fill));
}

function toMatrixVals(matrix: Matrix): Record<string, string> {
  const res: Record<string, string> = {};
  matrix.forEach((row, i) => row.forEach((v, j) => { res[`${i}-${j}`] = String(v); }));
  return res;
}

function det2(m: Matrix): number {
  return m[0][0]*m[1][1] - m[0][1]*m[1][0];
}

function det3(m: Matrix): number {
  return m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
       - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
       + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
}

function detGeneral(m: Matrix): number {
  const n = m.length;
  if (n === 0 || m[0].length !== n) return NaN;
  const A = m.map(row => row.slice());
  let det = 1;
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
    if (Math.abs(A[maxRow][i]) < 1e-10) return 0;
    if (maxRow !== i) { [A[i], A[maxRow]] = [A[maxRow], A[i]]; det *= -1; }
    det *= A[i][i];
    for (let k = i + 1; k < n; k++) {
      const factor = A[k][i] / A[i][i];
      for (let j = i; j < n; j++) A[k][j] -= factor * A[i][j];
    }
  }
  return det;
}

function inverseGeneral(m: Matrix): Matrix | null {
  const n = m.length;
  if (n === 0 || m[0].length !== n) return null;
  const A = m.map(row => row.map(v => v));
  const I = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
    if (Math.abs(A[maxRow][i]) < 1e-10) return null;
    if (maxRow !== i) { [A[i], A[maxRow]] = [A[maxRow], A[i]]; [I[i], I[maxRow]] = [I[maxRow], I[i]]; }
    const pivot = A[i][i];
    for (let j = 0; j < n; j++) { A[i][j] /= pivot; I[i][j] /= pivot; }
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = A[k][i];
      for (let j = 0; j < n; j++) { A[k][j] -= factor * A[i][j]; I[k][j] -= factor * I[i][j]; }
    }
  }
  return I;
}

function rankMatrix(m: Matrix): number {
  const rows = m.length;
  if (rows === 0) return 0;
  const cols = m[0].length;
  const A = m.map(row => row.map(v => v));
  let rank = 0;
  const tol = 1e-10;
  for (let col = 0, row = 0; col < cols && row < rows; col++, row++) {
    let sel = row;
    for (let i = row; i < rows; i++) if (Math.abs(A[i][col]) > Math.abs(A[sel][col])) sel = i;
    if (Math.abs(A[sel][col]) < tol) { row--; continue; }
    [A[row], A[sel]] = [A[sel], A[row]];
    for (let i = row + 1; i < rows; i++) {
      const factor = A[i][col] / A[row][col];
      for (let j = col; j < cols; j++) A[i][j] -= factor * A[row][j];
    }
    rank++;
  }
  return rank;
}

function traceMatrix(m: Matrix): number {
  const n = Math.min(m.length, m[0]?.length || 0);
  let s = 0;
  for (let i = 0; i < n; i++) s += m[i][i] || 0;
  return s;
}

function transposeMatrix(m: Matrix): Matrix {
  const r = m.length, c = m[0]?.length || 0;
  return Array.from({ length: c }, (_, j) => Array.from({ length: r }, (_, i) => m[i][j]));
}

function addMatrix(a: Matrix, b: Matrix): Matrix | null {
  if (a.length !== b.length || a[0]?.length !== b[0]?.length) return null;
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}

function subtractMatrix(a: Matrix, b: Matrix): Matrix | null {
  if (a.length !== b.length || a[0]?.length !== b[0]?.length) return null;
  return a.map((row, i) => row.map((v, j) => v - b[i][j]));
}

function multiplyMatrix(a: Matrix, b: Matrix): Matrix | null {
  if (a[0]?.length !== b.length) return null;
  const r = a.length, c = b[0]?.length || 0, inner = b.length;
  const res: Matrix = Array.from({ length: r }, () => Array(c).fill(0));
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) for (let k = 0; k < inner; k++) res[i][j] += (a[i][k] || 0) * (b[k][j] || 0);
  return res;
}

function scalarMultiply(m: Matrix, s: number): Matrix {
  return m.map(row => row.map(v => v * s));
}

function inverse2(m: Matrix): Matrix {
  const d = det2(m);
  if (d === 0) return [[NaN, NaN], [NaN, NaN]];
  return [[m[1][1]/d, -m[0][1]/d], [-m[1][0]/d, m[0][0]/d]];
}

export function MatrixCalculator() {
  const { locale, dict } = useI18n();
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [values, setValues] = useState<Record<string, string>>(() => toMatrixVals(createMatrix(2, 2, 1)));

  // Update grid when dimensions change; preserve existing, fill rest with 0
  const handleDim = (r: number, c: number) => {
    setRows(r); setCols(c);
    const newM = createMatrix(r, c, 0);
    for (let i = 0; i < Math.min(r, 2); i++) for (let j = 0; j < Math.min(c, 2); j++) newM[i][j] = parseFloat(values[`${i}-${j}`]) || 0;
    setValues(toMatrixVals(newM));
  };

  const matrix = useMemo(() => {
    const m: Matrix = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => parseFloat(values[`${i}-${j}`]) || 0));
    return m;
  }, [rows, cols, values]);

  const result = useMemo(() => {
    if (rows === cols && rows >= 2 && rows <= 6) {
      const d = detGeneral(matrix);
      return {
        'Determinant': Math.abs(d) < 1e-10 ? 0 : d,
        'Trace': traceMatrix(matrix),
        'Inverse': (rows === cols && rows <= 6) ? inverseGeneral(matrix) : null,
        'Rank': rankMatrix(matrix),
        'Nullity': (rows === cols ? cols : cols) - rankMatrix(matrix),
        'Size': `${rows}×${cols}`
      };
    }
    if (rows === cols && (rows < 2 || rows > 6)) {
      return { 'Determinant': 'N/A', 'Trace': 'N/A', 'Inverse': null, 'Rank': rankMatrix(matrix), 'Nullity': cols - rankMatrix(matrix), 'Size': `${rows}×${cols}` };
    }
    return { 'Determinant': 'N/A — determinant only exists for square matrices', 'Trace': 'N/A', 'Inverse': null, 'Rank': rankMatrix(matrix), 'Nullity': cols - rankMatrix(matrix), 'Size': `${rows}×${cols}` };
  }, [matrix, rows, cols]);

  return (
    <CalculatorActions calculatorId="matrix" result={result as any} inputs={{ rows, cols }}>
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2">Matrix Calculator</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Choose rows and columns, enter values, see determinant/trace.</p>
        </div>

        {/* Dimension selectors */}
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Rows</label>
            <SegmentedControl options={[2,3,4,5,6].map(n=>({value:String(n),label:String(n)}))} value={String(rows)} onChange={(v)=>handleDim(parseInt(v), cols)} size="sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Columns</label>
            <SegmentedControl options={[2,3,4,5,6].map(n=>({value:String(n),label:String(n)}))} value={String(cols)} onChange={(v)=>handleDim(rows, parseInt(v))} size="sm" />
          </div>
        </div>

        {/* Input grid */}
        <div className="overflow-x-auto">
          <div className="inline-block">
            <table className="border-collapse">
              <tbody>
                {Array.from({ length: rows }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: cols }).map((__, j) => (
                      <td key={j} className="p-1">
                        <input
                          type="number"
                          value={values[`${i}-${j}`] ?? '0'}
                          onChange={(e) => setValues({ ...values, [`${i}-${j}`]: e.target.value })}
                          className="w-16 sm:w-20 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Output */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-brand-sapphire/10 p-4 text-center">
            <p className="text-xs font-bold uppercase text-brand-sapphire">Determinant</p>
            <p className="text-2xl font-display font-black text-brand-sapphire">{typeof result.Determinant === 'number' ? result.Determinant.toFixed(4) : result.Determinant}</p>
          </div>
          <div className="rounded-2xl bg-green-500/10 p-4 text-center">
            <p className="text-xs font-bold uppercase text-green-600">Trace</p>
            <p className="text-2xl font-display font-black text-green-600">{typeof result.Trace === 'number' ? result.Trace.toFixed(4) : result.Trace}</p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 p-4 text-center">
            <p className="text-xs font-bold uppercase text-purple-600">Size</p>
            <p className="text-2xl font-display font-black text-purple-600">{result.Size}</p>
          </div>
        </div>
      </div>
    </CalculatorActions>
  );
}
