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
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onView: (id: string) => void;
  isEditing: boolean;
  isSelected: boolean;
}

const priorityClass = {
  critical: 'border-rose-500 text-rose-300 bg-rose-500/10',
  high: 'border-amber-500 text-amber-300 bg-amber-500/10',
  medium: 'border-yellow-500 text-yellow-300 bg-yellow-500/10',
  low: 'border-cyan-500 text-cyan-300 bg-cyan-500/10',
};

const statusClass = {
  open: 'border-blue-500 text-blue-300 bg-blue-500/10',
  in_progress: 'border-sky-500 text-sky-300 bg-sky-500/10',
  resolved: 'border-emerald-500 text-emerald-300 bg-emerald-500/10',
  closed: 'border-slate-500 text-slate-300 bg-slate-500/10',
};

const CaseCard = ({
  caseItem,
  onDelete,
  onEdit,
  onStatusChange,
  onView,
  isEditing,
  isSelected,
}: CaseCardProps) => {
  const caseCode = `#SC-${1040 + Number(caseItem.id)}`;

  return (
    <article
      className={`rounded-md border bg-slate-950/20 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900/70 ${
        isSelected ? 'border-blue-500 shadow-[inset_3px_0_0_#3b82f6]' : 'border-slate-700/80'
      }`}
      dir="ltr"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_170px_92px] lg:items-center">
        <div className="min-w-0" dir="rtl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-black text-blue-300">{caseCode}</span>
            <h3 className="truncate text-base font-black text-white">{caseItem.title}</h3>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span>{caseItem.customerName}</span>
            <span className="h-4 w-px bg-slate-700" />
            <span>{cityLabels[caseItem.city]}</span>
            <span className="h-4 w-px bg-slate-700" />
            <span>{caseItem.assignedTo || 'بدون مسئول'}</span>
          </div>

          <p className="mt-3 text-sm text-slate-300">ضرر احتمالی: {formatMoney(caseItem.estimatedLoss)}</p>
        </div>

        <div className="flex flex-wrap gap-2" dir="rtl">
          <span className={`rounded-md border px-3 py-1 text-xs font-bold ${statusClass[caseItem.status]}`}>
            {statusLabels[caseItem.status]}
          </span>
          <span className={`rounded-md border px-3 py-1 text-xs font-bold ${priorityClass[caseItem.priority]}`}>
            {priorityLabels[caseItem.priority]}
          </span>
          {caseItem.isEscalated ? (
            <span className="rounded-md border border-violet-500 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
              ارجاع‌شده
            </span>
          ) : null}
        </div>

        <div className="grid gap-2 border-slate-700 lg:border-l lg:pl-4" dir="rtl">
          <select
            className="rounded-md border border-slate-700 bg-[#071528] px-2 py-2 text-xs font-bold text-slate-300 outline-none transition hover:border-blue-400 focus:border-blue-400"
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
            className="text-right text-xs font-bold text-slate-300 transition hover:text-blue-300"
            type="button"
            onClick={() => onView(caseItem.id)}
          >
            مشاهده
          </button>
          <button
            className="text-right text-xs font-bold text-slate-300 transition hover:text-blue-300"
            type="button"
            onClick={() => onEdit(caseItem.id)}
          >
            {isEditing ? 'در حال ویرایش' : 'ویرایش'}
          </button>
          <button
            className="text-right text-xs font-bold text-rose-300 transition hover:text-rose-200"
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
