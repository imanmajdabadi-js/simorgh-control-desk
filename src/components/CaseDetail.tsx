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
  onClose: () => void;
  onEdit: (id: string) => void;
}

const CaseDetail = ({ caseItem, onClose, onEdit }: CaseDetailProps) => {
  if (!caseItem) {
    return (
      <aside
        className="h-full rounded-md border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center"
        dir="rtl"
      >
        <p className="text-lg font-black text-white">پرونده‌ای انتخاب نشده</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          از لیست یک پرونده را انتخاب کن تا جزئیات مشتری و وضعیت را ببینی.
        </p>
      </aside>
    );
  }

  const caseCode = `#SC-${1040 + Number(caseItem.id)}`;
  const createdAt = new Date(caseItem.createdAt).toLocaleString('fa-IR');
  const updatedAt = new Date(caseItem.lastUpdatedAt).toLocaleString('fa-IR');

  return (
    <aside
      className="h-full rounded-md border border-slate-700/80 bg-slate-900/60 shadow-[0_18px_70px_rgba(15,23,42,0.22)]"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-700/80 p-5">
        <div>
          <p className="font-mono text-sm font-black text-blue-300">{caseCode}</p>
          <h2 className="mt-2 text-xl font-black leading-8 text-white">
            {caseItem.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-md border border-blue-500 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
              {statusLabels[caseItem.status]}
            </span>
            <span className="rounded-md border border-rose-500 bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-300">
              {priorityLabels[caseItem.priority]}
            </span>
            {caseItem.isEscalated ? (
              <span className="rounded-md border border-violet-500 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
                ارجاع‌شده
              </span>
            ) : null}
          </div>
        </div>
        <button
          className="grid h-9 w-9 place-items-center rounded-md border border-slate-700 text-slate-300 transition hover:border-blue-400 hover:text-blue-300"
          type="button"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="space-y-5 p-5">
        <section>
          <SectionTitle title="مشتری" />
          <div className="mt-3 grid grid-cols-[120px_1fr] gap-y-3 text-sm">
            <DetailRow label="نام مشتری" value={caseItem.customerName} />
            <DetailRow label="شهر" value={cityLabels[caseItem.city]} />
            <DetailRow label="سرویس" value={categoryLabels[caseItem.category]} />
            <DetailRow label="مسئول" value={caseItem.assignedTo || 'بدون مسئول'} />
          </div>
        </section>

        <section className="border-t border-slate-700/80 pt-5">
          <SectionTitle title="جزئیات عملیاتی" />
          <div className="mt-3 grid grid-cols-[120px_1fr] gap-y-3 text-sm">
            <DetailRow label="ضرر احتمالی" value={formatMoney(caseItem.estimatedLoss)} />
            <DetailRow label="ثبت‌شده" value={createdAt} />
            <DetailRow label="آخرین تغییر" value={updatedAt} />
          </div>
        </section>

        <section className="border-t border-slate-700/80 pt-5">
          <SectionTitle title="توضیحات" />
          <p className="mt-3 text-sm leading-7 text-slate-300">{caseItem.description}</p>
        </section>

        <section className="border-t border-slate-700/80 pt-5">
          <SectionTitle title="خط زمان" />
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <TimelineRow title="پرونده ایجاد شد" time={createdAt} />
            <TimelineRow title={`وضعیت فعلی: ${statusLabels[caseItem.status]}`} time={updatedAt} />
          </div>
        </section>

        <div className="grid gap-3 border-t border-slate-700/80 pt-5 sm:grid-cols-2">
          <button
            className="h-12 rounded-md border border-slate-700 bg-slate-800/60 text-sm font-black text-slate-200 transition hover:border-blue-400 hover:text-blue-300"
            onClick={onClose}
            type="button"
          >
            بستن
          </button>
          <button
            className="h-12 rounded-md bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
            onClick={() => onEdit(caseItem.id)}
            type="button"
          >
            ویرایش پرونده
          </button>
        </div>
      </div>
    </aside>
  );
};

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h3 className="text-sm font-black text-white">{title}</h3>;
};

interface TimelineRowProps {
  title: string;
  time: string;
}

const TimelineRow = ({ title, time }: TimelineRowProps) => {
  return (
    <div className="grid grid-cols-[14px_1fr] gap-3">
      <span className="mt-1 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />
      <div className="flex flex-wrap justify-between gap-2">
        <span>{title}</span>
        <span className="text-xs text-slate-500">{time}</span>
      </div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <>
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-slate-200">{value}</span>
    </>
  );
};

export default CaseDetail;
