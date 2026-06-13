"use client";

import { useActionState } from "react";
import { sendEmail } from "@/app/[locale]/contact/actions";
import clsx from "clsx";

type FormLabels = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
};

export default function ContactForm({ labels }: { labels: FormLabels }) {
  const [state, action, isPending] = useActionState(sendEmail, null);

  return (
    <form action={action} className="flex flex-col gap-6">
      
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
          {labels.name}
        </label>
        <input 
          type="text" 
          id="name" 
          name="name"
          required
          disabled={isPending}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-orange-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-orange-500 dark:focus:ring-orange-500 disabled:opacity-50" 
          placeholder="Jane Doe" 
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
          {labels.email}
        </label>
        <input 
          type="email" 
          id="email" 
          name="email"
          required
          disabled={isPending}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-orange-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-orange-500 dark:focus:ring-orange-500 disabled:opacity-50" 
          placeholder="jane@example.com" 
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
          {labels.message}
        </label>
        <textarea 
          id="message" 
          name="message"
          rows={4} 
          required
          disabled={isPending}
          className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-orange-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-orange-500 dark:focus:ring-orange-500 disabled:opacity-50" 
          placeholder="..." 
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="mt-2 w-full rounded-xl bg-orange-800 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-700 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 dark:bg-orange-900 dark:hover:bg-orange-800"
      >
        {isPending ? labels.sending : labels.send}
      </button>

      {state?.success && (
        <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">
          {labels.success}
        </p>
      )}

      {state?.error && (
        <p className="text-center text-sm font-medium text-red-600 dark:text-red-400">
          {labels.error}
        </p>
      )}
      
    </form>
  );
}
