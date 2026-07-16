import type { SummaryType } from '../types';

interface SummaryProps {
  summary: SummaryType;
}

const accentClass = {
  blue: 'from-blue-500 to-cyan-400',
  green: 'from-emerald-500 to-teal-400',
  orange: 'from-amber-500 to-orange-400',
  rose: 'from-rose-500 to-pink-400',
  violet: 'from-violet-500 to-indigo-400',
};

const Summary = ({ summary }: SummaryProps) => {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-2 w-16 rounded-full bg-gradient-to-l ${accentClass[summary.accent]}`} />

      <p className="mt-5 text-sm font-medium text-slate-500">{summary.title}</p>
      <strong className="mt-2 block text-3xl font-black tracking-tight text-slate-950">
        {summary.value}
      </strong>
      <p className="mt-3 text-xs leading-6 text-slate-400">{summary.caption}</p>
    </article>
  );
};

export default Summary;
