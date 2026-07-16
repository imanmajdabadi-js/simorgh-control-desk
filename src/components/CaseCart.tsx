import type { CaseType, Status } from '../types';
import {
  cityLabels,
  formatMoney,
  priorityLabels,
  statusLabels,
  statusOptions,
} from '../utils';

export interface CaseCardProps {
  caseItem: CaseType;
  count: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onView: (id: string) => void;
  isEditing: boolean;
  isSelected: boolean;
}

const priorityClass = {
  critical: 'bg-rose-100 text-rose-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-emerald-100 text-emerald-700',
};

const statusClass = {
  open: 'bg-cyan-100 text-cyan-700',
  in_progress: 'bg-violet-100 text-violet-700',
  resolved: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-slate-200 text-slate-600',
};

const CaseCard = ({
  caseItem,
  count,
  onDelete,
  onEdit,
  onStatusChange,
  onView,
  isEditing,
  isSelected,
}: CaseCardProps) => {
  return (
    <article
      className={`rounded-3xl border bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isSelected ? 'border-blue-400 ring-4 ring-blue-100' : 'border-slate-200'
      }`}
    >
      <div className="grid gap-4 xl:grid-cols-[44px_minmax(0,1fr)_220px_auto] xl:items-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
          {count}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[caseItem.status]}`}>
              {statusLabels[caseItem.status]}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClass[caseItem.priority]}`}>
              {priorityLabels[caseItem.priority]}
            </span>
          </div>

          <h3 className="mt-3 truncate text-base font-black text-slate-950">
            {caseItem.title}
          </h3>
          <p className="mt-1 truncate text-sm text-slate-500">
            {caseItem.customerName} / {cityLabels[caseItem.city]}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-3 text-sm">
          <p className="font-bold text-slate-950">{formatMoney(caseItem.estimatedLoss)}</p>
          <p className="mt-1 text-xs text-slate-500">ضرر احتمالی</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 outline-none transition hover:border-blue-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            value={caseItem.status}
            onChange={(event) => onStatusChange(caseItem.id, event.target.value as Status)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
          <button
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
            type="button"
            onClick={() => onView(caseItem.id)}
          >
            مشاهده
          </button>
          <button
            className="rounded-xl border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50"
            type="button"
            onClick={() => onEdit(caseItem.id)}
          >
            {isEditing ? 'در حال ویرایش' : 'ویرایش'}
          </button>
          <button
            className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
            type="button"
            onClick={() => onDelete(caseItem.id)}
          >
            حذف
          </button>
        </div>
      </div>
    </article>
  );
};

export default CaseCard;
