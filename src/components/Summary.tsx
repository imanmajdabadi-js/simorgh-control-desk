import type { LucideIcon } from 'lucide-react';

export type SummaryAccent = 'blue' | 'green' | 'rose' | 'gold';

export interface SummaryItem {
  accent: SummaryAccent;
  caption: string;
  icon: LucideIcon;
  id: string;
  title: string;
  value: string;
}

interface SummaryProps {
  summary: SummaryItem;
}

const accentClasses: Record<SummaryAccent, string> = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  gold: 'bg-amber-50 text-amber-700 ring-amber-100',
};

const Summary = ({ summary }: SummaryProps) => {
  const Icon = summary.icon;

  return (
    <article className="flex min-h-36 animate-enter items-center gap-4 rounded-panel border border-stroke bg-surface p-5 shadow-panel">
      <div
        className={`grid h-13 w-13 shrink-0 place-items-center rounded-2xl ring-1 ${accentClasses[summary.accent]}`}
        aria-hidden="true"
      >
        <Icon size={24} strokeWidth={2.2} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold text-ink-soft">{summary.title}</p>
        <strong className="mt-1 block truncate text-metric font-black tracking-tight text-ink">
          {summary.value}
        </strong>
        <p className="mt-1 text-caption text-muted">{summary.caption}</p>
      </div>
    </article>
  );
};

export default Summary;
