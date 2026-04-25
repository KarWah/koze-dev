"use client";

type FormLabels = {
  name: string;
  email: string;
  message: string;
  send: string;
};

export default function ContactForm({ labels }: { labels: FormLabels }) {
  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
          {labels.name}
        </label>
        <input 
          type="text" 
          id="name" 
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-orange-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-orange-500 dark:focus:ring-orange-500" 
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
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-orange-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-orange-500 dark:focus:ring-orange-500" 
          placeholder="jane@example.com" 
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
          {labels.message}
        </label>
        <textarea 
          id="message" 
          rows={4} 
          className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 transition-colors focus:border-orange-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-orange-500 dark:focus:ring-orange-500" 
          placeholder="..." 
        />
      </div>

      <button 
        type="submit" 
        className="mt-2 w-full rounded-xl bg-orange-800 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:scale-[0.98] dark:bg-orange-900 dark:hover:bg-orange-800"
      >
        {labels.send}
      </button>
      
    </form>
  );
}