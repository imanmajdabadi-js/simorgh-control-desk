import { ArrowUpLeft } from 'lucide-react';
import type { Priority, Status } from '../types';
import { priorityLabels, statusLabels } from '../utils';

const statusClasses: Record<Status, string> = {
  open: 'border-blue-200 bg-blue-50 text-blue-700',
  in_progress: 'border-sky-200 bg-sky-50 text-sky-700',
  resolved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  closed: 'border-slate-200 bg-slate-100 text-slate-600',
};

const priorityClasses: Record<Priority, string> = {
  critical: 'border-rose-200 bg-rose-50 text-rose-700',
  high: 'border-orange-200 bg-orange-50 text-orange-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-700',
  low: 'border-cyan-200 bg-cyan-50 text-cyan-700',
};

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border px-3 text-caption font-bold ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: Priority;
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border px-3 text-caption font-bold ${priorityClasses[priority]}`}
    >
      اولویت {priorityLabels[priority]}
    </span>
  );
};

export const EscalatedBadge = () => {
  return (
    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 text-caption font-bold text-violet-700">
      <ArrowUpLeft size={14} />
      ارجاع‌شده
    </span>
  );
};
