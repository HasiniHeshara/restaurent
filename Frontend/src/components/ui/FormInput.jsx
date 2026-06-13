import { cn } from "../../lib/utils";

export default function FormInput({ label, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal-900/50 mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3.5 rounded-xl border border-gold-500/15 bg-cream-50 text-charcoal-900 text-sm",
          "placeholder:text-charcoal-900/30 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/15 transition-all",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function FormTextarea({ label, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal-900/50 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-4 py-3.5 rounded-xl border border-gold-500/15 bg-cream-50 text-charcoal-900 text-sm min-h-[100px] resize-y",
          "placeholder:text-charcoal-900/30 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/15 transition-all",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function FormSelect({ label, className = "", children, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal-900/50 mb-2">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full px-4 py-3.5 rounded-xl border border-gold-500/15 bg-cream-50 text-charcoal-900 text-sm",
          "focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/15 transition-all",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
