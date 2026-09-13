'use client';

import { Send } from 'lucide-react';

export function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || 'Friend';
        const msg = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
        window.location.href = `mailto:support@realcalculator365.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Hi Real Calculator 365 Team,\n\nName: ${name}\n\n${msg}\n\n— Sent from Real Calculator 365 Contact`)}`;
      }}
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/40 transition" />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/40 transition" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Message</label>
        <textarea id="message" name="message" rows={4} required placeholder="What can we help with? Feature request? Bug? Partnership idea?" className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/40 transition resize-none" />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-brand-sapphire hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-brand-sapphire/20 hover:shadow-brand-sapphire/40 active:scale-[0.98]"
      >
        <Send className="w-4 h-4" /> Send Message
      </button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Opens <strong>Gmail / your default email app</strong> with the message pre-filled. No server storage — entirely private.
      </p>
    </form>
  );
}
