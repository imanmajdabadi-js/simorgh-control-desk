import type { SummaryType } from '../types';

interface SummaryProps {
  summary: SummaryType;
}

const accentClass = {
  blue: 'border-blue-400/30 bg-blue-500/10 text-blue-300',
  green: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
  orange: 'border-amber-400/30 bg-amber-500/10 text-amber-300',
  rose: 'border-rose-400/30 bg-rose-500/10 text-rose-300',
  violet: 'border-violet-400/30 bg-violet-500/10 text-violet-300',
};

const Summary = ({ summary }: SummaryProps) => {
  return (
    <article className="group flex min-h-28 items-center gap-4 rounded-md border border-slate-700/80 bg-slate-900/70 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/70 hover:bg-slate-900">
      <div
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border text-2xl ${accentClass[summary.accent]}`}
      >
        {summary.icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-300">{summary.title}</p>
        <strong className="mt-1 block text-3xl font-black tracking-tight text-white">
          {summary.value}
        </strong>
        <p className="mt-1 text-xs leading-5 text-slate-400">{summary.caption}</p>
      </div>
    </article>
  );
};

export default Summary;
