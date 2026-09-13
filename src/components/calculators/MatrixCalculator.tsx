'use client';
import { useState, useMemo, useEffect } from 'react';
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

export function MatrixCalculator() {
  const { locale, dict } = useI18n();
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [values, setValues] = useState<Record<string, string>>(() => toMatrixVals(createMatrix(2, 2, 1)));
  const [op, setOp] = useState<'properties' | 'addition' | 'subtraction' | 'multiplication' | 'scalar' | 'transpose'>('properties');
  const [scalar, setScalar] = useState(2);
  const [bRows, setBRows] = useState(2);
  const [bCols, setBCols] = useState(2);
  const [bValues, setBValues] = useState<Record<string, string>>(() => toMatrixVals(createMatrix(2, 2, 1)));

  // Dimension change for matrix A
  const handleDim = (r: number, c: number) => {
    setRows(r); setCols(c);
    const newM = createMatrix(r, c, 0);
    for (let i = 0; i < Math.min(r, rows); i++) for (let j = 0; j < Math.min(c, cols); j++) newM[i][j] = parseFloat(values[`${i}-${j}`]) || 0;
    setValues(toMatrixVals(newM));
  };

  const matrixA = useMemo(() => {
    return Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => parseFloat(values[`${i}-${j}`]) || 0));
  }, [rows, cols, values]);

  const matrixB = useMemo(() => {
    return Array.from({ length: bRows }, (_, i) => Array.from({ length: bCols }, (_, j) => parseFloat(bValues[`${i}-${j}`]) || 0));
  }, [bRows, bCols, bValues]);

  // Dynamic B dimensions for multiplication when A columns change
  useEffect(() => {
    if (op === 'multiplication') {
      setBRows(cols);
      setBCols(2);
      const newM = createMatrix(cols, 2, 0);
      for (let i = 0; i < Math.min(cols, bRows); i++) for (let j = 0; j < Math.min(2, bCols); j++) newM[i][j] = parseFloat(bValues[`${i}-${j}`]) || 0;
      setBValues(toMatrixVals(newM));
      setBRows(cols);
      setBCols(2);
    }
  }, [cols, op]);

  const handleBDim = (r: number, c: number) => {
    setBRows(r); setBCols(c);
    const newM = createMatrix(r, c, 0);
    for (let i = 0; i < Math.min(r, bRows); i++) for (let j = 0; j < Math.min(c, bCols); j++) newM[i][j] = parseFloat(bValues[`${i}-${j}`]) || 0;
    setBValues(toMatrixVals(newM));
  };

  const propertiesResult = useMemo(() => {
    const r = rankMatrix(matrixA);
    const d = (rows === cols && rows >= 2 && rows <= 6) ? detGeneral(matrixA) : NaN;
    return {
      'Determinant': (rows === cols && rows >= 2 && rows <= 6) ? (Math.abs(d) < 1e-10 ? 0 : d) : 'N/A — determinant only exists for square matrices',
      'Trace': (rows === cols && rows >= 2 && rows <= 6) ? traceMatrix(matrixA) : 'N/A',
      'Inverse': (rows === cols && rows >= 2 && rows <= 6) ? (inverseGeneral(matrixA) ? 'Calculated below' : 'Matrix is singular and has no inverse') : (rows === cols ? 'N/A' : 'N/A — only square matrices'),
      'Rank': r,
      'Nullity': cols - r,
      'Size': `${rows}×${cols}`
    };
  }, [matrixA, rows, cols]);

  const resultMatrix = useMemo(() => {
    switch (op) {
      case 'addition': {
        const res = addMatrix(matrixA, matrixB);
        if (res) return { matrix: res, msg: null };
        return { matrix: null, msg: 'Addition requires identical dimensions (A and B must be the same size).' };
      }
      case 'subtraction': {
        const res = subtractMatrix(matrixA, matrixB);
        if (res) return { matrix: res, msg: null };
        return { matrix: null, msg: 'Subtraction requires identical dimensions (A and B must be the same size).' };
      }
      case 'multiplication': {
        const res = multiplyMatrix(matrixA, matrixB);
        if (res) return { matrix: res, msg: null };
        return { matrix: null, msg: 'Multiplication requires columns of A = rows of B.' };
      }
      case 'scalar': {
        return { matrix: scalarMultiply(matrixA, scalar), msg: null };
      }
      case 'transpose': {
        return { matrix: transposeMatrix(matrixA), msg: null };
      }
      default:
        return { matrix: null, msg: null };
    }
  }, [op, matrixA, matrixB, scalar]);

  const inverseMatrix = useMemo(() => {
    if (rows !== cols) return null;
    if (rows < 2 || rows > 6) return null;
    return inverseGeneral(matrixA);
  }, [matrixA, rows, cols]);

  const opOptions = [
    { value: 'properties' as const, label: 'Properties' },
    { value: 'addition' as const, label: 'Addition' },
    { value: 'subtraction' as const, label: 'Subtraction' },
    { value: 'multiplication' as const, label: 'Multiplication' },
    { value: 'scalar' as const, label: 'Scalar' },
    { value: 'transpose' as const, label: 'Transpose' },
  ];

  return (
    <CalculatorActions calculatorId="matrix" result={op === 'properties' ? (propertiesResult as any) : (resultMatrix.matrix ? resultMatrix.matrix : resultMatrix.msg)} inputs={{ rows, cols, op }}>
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2">Matrix Calculator</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Choose dimensions, enter values, perform operations.</p>
        </div>

        {/* Operation selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Operation</label>
          <SegmentedControl options={opOptions} value={op} onChange={(v) => setOp(v as any)} size="sm" />
        </div>

        {/* Dimension selectors - shared segmented control for rows/cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Rows (A)</label>
            <SegmentedControl options={[2,3,4,5,6].map(n=>({value:String(n),label:String(n)}))} value={String(rows)} onChange={(v)=>handleDim(parseInt(v), cols)} size="sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Columns (A)</label>
            <SegmentedControl options={[2,3,4,5,6].map(n=>({value:String(n),label:String(n)}))} value={String(cols)} onChange={(v)=>handleDim(rows, parseInt(v))} size="sm" />
          </div>
        </div>

        {/* Matrix A input grid */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Matrix A ({rows}×{cols})</div>
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
                          className="w-14 sm:w-20 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Second matrix for binary ops */}
        {(op === 'addition' || op === 'subtraction' || op === 'multiplication') && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Rows (B)</label>
                <SegmentedControl options={[2,3,4,5,6].map(n=>({value:String(n),label:String(n)}))} value={String(bRows)} onChange={(v)=>handleBDim(parseInt(v), bCols)} size="sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Columns (B)</label>
                <SegmentedControl options={[2,3,4,5,6].map(n=>({value:String(n),label:String(n)}))} value={String(bCols)} onChange={(v)=>handleBDim(bRows, parseInt(v))} size="sm" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1">Matrix B ({bRows}×{bCols})</div>
                <table className="border-collapse">
                  <tbody>
                    {Array.from({ length: bRows }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: bCols }).map((__, j) => (
                          <td key={j} className="p-1">
                            <input
                              type="number"
                              value={bValues[`${i}-${j}`] ?? '0'}
                              onChange={(e) => setBValues({ ...bValues, [`${i}-${j}`]: e.target.value })}
                              className="w-14 sm:w-20 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Scalar input */}
        {op === 'scalar' && (
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold uppercase text-gray-500">Scalar</label>
            <input
              type="number"
              value={scalar}
              onChange={(e) => setScalar(parseFloat(e.target.value) || 0)}
              className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
            />
          </div>
        )}

        {/* Validation / result messages */}
        {op !== 'properties' && resultMatrix.msg && (
          <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-rose-700 dark:text-rose-300 text-sm font-medium">{resultMatrix.msg}</div>
        )}

        {/* Result matrix display for operations */}
        {op !== 'properties' && resultMatrix.matrix && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase text-brand-sapphire">Result</div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <table className="border-collapse">
                  <tbody>
                    {resultMatrix.matrix.map((row, i) => (
                      <tr key={i}>
                        {row.map((v, j) => (
                          <td key={j} className="p-1">
                            <div className="w-14 sm:w-20 px-2 py-2 rounded-lg bg-brand-sapphire/10 text-center text-sm font-medium text-brand-sapphire">{typeof v === 'number' ? (Math.abs(v) < 1e-10 ? 0 : Number(v.toFixed(4))).toString() : v}</div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inverse detail for properties */}
        {op === 'properties' && (rows === cols && rows >= 2 && rows <= 6) && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase text-brand-sapphire">Inverse ({rows}×{cols})</div>
            {inverseMatrix ? (
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <table className="border-collapse">
                    <tbody>
                      {inverseMatrix.map((row, i) => (
                        <tr key={i}>
                          {row.map((v, j) => (
                            <td key={j} className="p-1">
                              <div className="w-16 sm:w-24 px-2 py-2 rounded-lg bg-purple-500/10 text-center text-sm font-medium text-purple-700 dark:text-purple-300">{typeof v === 'number' ? (Math.abs(v) < 1e-10 ? 0 : Number(v.toFixed(4))).toString() : v}</div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-rose-700 dark:text-rose-300 text-sm font-medium">Matrix is singular and has no inverse</div>
            )}
          </div>
        )}

        {/* Properties output */}
        {op === 'properties' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-brand-sapphire/10 p-4 text-center">
              <p className="text-xs font-bold uppercase text-brand-sapphire">Determinant</p>
              <p className="text-2xl font-display font-black text-brand-sapphire">{typeof propertiesResult.Determinant === 'number' ? propertiesResult.Determinant.toFixed(4) : propertiesResult.Determinant}</p>
            </div>
            <div className="rounded-2xl bg-green-500/10 p-4 text-center">
              <p className="text-xs font-bold uppercase text-green-600">Trace</p>
              <p className="text-2xl font-display font-black text-green-600">{typeof propertiesResult.Trace === 'number' ? propertiesResult.Trace.toFixed(4) : propertiesResult.Trace}</p>
            </div>
            <div className="rounded-2xl bg-purple-500/10 p-4 text-center">
              <p className="text-xs font-bold uppercase text-purple-600">Rank</p>
              <p className="text-2xl font-display font-black text-purple-600">{propertiesResult.Rank}</p>
            </div>
            <div className="rounded-2xl bg-orange-500/10 p-4 text-center">
              <p className="text-xs font-bold uppercase text-orange-600">Nullity</p>
              <p className="text-2xl font-display font-black text-orange-600">{propertiesResult.Nullity}</p>
            </div>
            <div className="rounded-2xl bg-pink-500/10 p-4 text-center">
              <p className="text-xs font-bold uppercase text-pink-600">Size</p>
              <p className="text-2xl font-display font-black text-pink-600">{propertiesResult.Size}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorActions>
  );
}
