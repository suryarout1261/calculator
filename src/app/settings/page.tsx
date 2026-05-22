'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Shield, Check, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const changePassword = useAuthStore((s) => s.changePassword);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => { setHydrated(true); }, []);
  useEffect(() => { if (hydrated && !user) router.push('/login'); }, [hydrated, user, router]);
  useEffect(() => { if (user) { setName(user.name); setEmail(user.email); } }, [user]);

  if (!hydrated || !user) return null;

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name cannot be empty.'); return; }
    if (!email.includes('@')) { toast.error('Enter a valid email.'); return; }
    const ok = updateProfile({ name: name.trim(), email: email.trim() });
    if (ok) toast.success('Profile updated successfully!');
    else toast.error('Email already in use by another account.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) { toast.error('Enter your current password.'); return; }
    if (newPassword.length < 6) { toast.error('New password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match.'); return; }
    const ok = changePassword(currentPassword, newPassword);
    if (ok) { toast.success('Password changed successfully!'); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }
    else toast.error('Current password is incorrect.');
  };

  const handleDeleteAccount = () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    // Remove from accounts DB
    if (typeof window !== 'undefined') {
      try {
        const accounts = JSON.parse(localStorage.getItem('shivarkaa-accounts') || '[]');
        const filtered = accounts.filter((a: { id: string }) => a.id !== user.id);
        localStorage.setItem('shivarkaa-accounts', JSON.stringify(filtered));
      } catch {}
    }
    logout();
    toast.success('Account deleted.');
    router.push('/');
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">Manage your profile, password, and account preferences.</p>

          {/* Profile Section */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-8">
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-brand-sapphire" /> Profile Details
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="submit" className="btn-primary flex items-center gap-2"><Check className="w-4 h-4" /> Save Changes</button>
                <span className="text-xs text-gray-500">Plan: <strong className="text-brand-gold">{user.isPremium ? 'Premium' : 'Free'}</strong></span>
              </div>
            </form>
          </motion.section>

          {/* Password Section */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 mb-8">
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-gold" /> Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Passwords do not match</p>
                )}
              </div>
              <button type="submit" className="btn-primary flex items-center gap-2"><Shield className="w-4 h-4" /> Update Password</button>
            </form>
          </motion.section>

          {/* Danger Zone */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 border-red-200 dark:border-red-900/50">
            <h2 className="font-display text-lg font-bold text-red-600 mb-3">Danger Zone</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <button onClick={handleDeleteAccount} className="px-5 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-500/20 transition">
              Delete My Account
            </button>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}

