'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calculator, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, signup, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email || password.length < 6) { toast.error('Enter valid email and password (6+ chars).'); return; }
      const ok = await login(email, password);
      if (ok) { toast.success('Welcome back!'); router.push('/dashboard'); }
      else toast.error('Invalid email or password. Please try again or sign up.');
    } else {
      if (!name.trim()) { toast.error('Please enter your name.'); return; }
      if (!email.includes('@')) { toast.error('Please enter a valid email.'); return; }
      if (password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
      const ok = await signup(name, email, password);
      if (ok) { toast.success('Account created! Welcome to SHIVARKAA.'); router.push('/dashboard'); }
      else toast.error('An account with this email already exists. Try signing in.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Calculator className="w-8 h-8 text-brand-gold" />
            <span className="font-display font-bold text-xl">SHIVARKAA<span className="text-brand-gold ml-1">CALCULATE</span></span>
          </Link>
          <h1 className="font-display text-2xl font-bold">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-sm text-gray-500 mt-1">{mode === 'login' ? 'Sign in to your account' : 'Get started for free'}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['login', 'signup'] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${mode === m ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="Password (6+ characters)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPass ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full btn-primary text-center disabled:opacity-50">
              {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            {mode === 'login' ? (
              <p>Don&apos;t have an account? <button onClick={() => setMode('signup')} className="text-brand-sapphire font-medium">Sign up free</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setMode('login')} className="text-brand-sapphire font-medium">Sign in</button></p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


