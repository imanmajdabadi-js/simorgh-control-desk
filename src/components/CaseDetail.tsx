import type { CaseType } from '../types';
import {
  categoryLabels,
  cityLabels,
  formatMoney,
  priorityLabels,
  statusLabels,
} from '../utils';

interface CaseDetailProps {
  caseItem: CaseType | null;
  onEdit: (id: string) => void;
}

const CaseDetail = ({ caseItem, onEdit }: CaseDetailProps) => {
  if (!caseItem) {
    return (
      <aside className="h-full rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center">
        <p className="text-lg font-black text-slate-900">پرونده‌ای انتخاب نشده</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          از لیست یک پرونده را انتخاب کن تا جزئیات مشتری و وضعیت را ببینی.
        </p>
      </aside>
    );
  }

  return (
    <aside className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-500">
            جزئیات پرونده
          </p>
          <h2 className="mt-2 text-xl font-black leading-8 text-slate-950">
            {caseItem.title}
          </h2>
        </div>
        {caseItem.isEscalated ? (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            ارجاع‌شده
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-4">
        <DetailRow label="مشتری" value={caseItem.customerName} />
        <DetailRow label="دسته‌بندی" value={categoryLabels[caseItem.category]} />
        <DetailRow label="شهر" value={cityLabels[caseItem.city]} />
        <DetailRow label="مسئول" value={caseItem.assignedTo || 'بدون مسئول'} />
        <DetailRow label="اولویت" value={priorityLabels[caseItem.priority]} />
        <DetailRow label="وضعیت" value={statusLabels[caseItem.status]} />
        <DetailRow label="ضرر احتمالی" value={formatMoney(caseItem.estimatedLoss)} />
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="text-sm font-black text-slate-950">توضیحات</h3>
        <p className="mt-2 text-sm leading-7 text-slate-500">{caseItem.description}</p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="text-sm font-black text-slate-950">برچسب‌ها</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {caseItem.tags.map((tag) => (
            <span
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        className="mt-6 h-12 w-full rounded-2xl bg-slate-950 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
        onClick={() => onEdit(caseItem.id)}
        type="button"
      >
        ویرایش پرونده
      </button>
    </aside>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
};

export default CaseDetail;
