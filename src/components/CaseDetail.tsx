import {
  CalendarClock,
  CircleUserRound,
  MapPin,
  Pencil,
  Plane,
  WalletCards,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { CaseType } from '../types';
import {
  categoryLabels,
  cityLabels,
  formatMoney,
  statusLabels,
} from '../utils';
import Button from './Button';
import { EscalatedBadge, PriorityBadge, StatusBadge } from './CaseBadges';

interface CaseDetailProps {
  caseItem: CaseType | null;
  onClose: () => void;
  onEdit: (id: string) => void;
}

const CaseDetail = ({ caseItem, onClose, onEdit }: CaseDetailProps) => {
  if (!caseItem) {
    return (
      <aside className="rounded-panel border border-dashed border-stroke-strong bg-surface p-6 text-center shadow-panel xl:sticky xl:top-28">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-brand">
          <Plane size={26} />
        </span>
        <p className="mt-4 text-xl font-black text-ink">جزئیات پرونده</p>
        <p className="mt-2 text-body text-muted">
          یک پرونده را از صف انتخاب کن تا اطلاعات کامل آن اینجا نمایش داده شود.
        </p>
      </aside>
    );
  }

  const caseCode = `SC-${1040 + Number(caseItem.id)}`;
  const createdAt = new Date(caseItem.createdAt).toLocaleString('fa-IR');
  const updatedAt = new Date(caseItem.lastUpdatedAt).toLocaleString('fa-IR');

  return (
    <aside className="overflow-hidden rounded-panel border border-stroke bg-surface shadow-panel xl:sticky xl:top-28">
      <header className="border-b border-stroke-soft p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-sm font-black text-brand">{caseCode}</p>
            <h2 className="mt-2 text-xl font-black leading-8 text-ink">
              {caseItem.title}
            </h2>
          </div>
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-control border border-stroke bg-surface-soft text-muted transition hover:border-brand hover:text-brand"
            aria-label="بستن جزئیات پرونده"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status={caseItem.status} />
          <PriorityBadge priority={caseItem.priority} />
          {caseItem.isEscalated ? <EscalatedBadge /> : null}
        </div>
      </header>

      <div className="space-y-6 p-5">
        <section>
          <SectionTitle title="اطلاعات پرونده" />
          <div className="mt-3 space-y-2.5">
            <DetailRow
              icon={<CircleUserRound size={18} />}
              label="مشتری"
              value={caseItem.customerName}
            />
            <DetailRow
              icon={<MapPin size={18} />}
              label="شهر"
              value={cityLabels[caseItem.city]}
            />
            <DetailRow
              icon={<Plane size={18} />}
              label="سرویس"
              value={categoryLabels[caseItem.category]}
            />
            <DetailRow
              icon={<CircleUserRound size={18} />}
              label="مسئول"
              value={caseItem.assignedTo || 'بدون مسئول'}
            />
            <DetailRow
              icon={<WalletCards size={18} />}
              label="ریسک مالی"
              value={formatMoney(caseItem.estimatedLoss)}
            />
          </div>
        </section>

        <section className="border-t border-stroke-soft pt-5">
          <SectionTitle title="شرح مسئله" />
          <p className="mt-3 text-body leading-8 text-ink-soft">
            {caseItem.description}
          </p>
        </section>

        <section className="border-t border-stroke-soft pt-5">
          <SectionTitle title="آخرین وضعیت ثبت‌شده" />
          <div className="mt-4 space-y-4">
            <TimelineRow
              description={createdAt}
              title="پرونده ایجاد شد"
            />
            <TimelineRow
              description={updatedAt}
              title={`وضعیت فعلی: ${statusLabels[caseItem.status]}`}
            />
          </div>
        </section>

        <Button
          className="w-full"
          icon={<Pencil size={18} />}
          onClick={() => onEdit(caseItem.id)}
          variant="primary"
        >
          ویرایش اطلاعات پرونده
        </Button>
      </div>
    </aside>
  );
};

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h3 className="text-base font-black text-ink">{title}</h3>;
};

interface DetailRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const DetailRow = ({ icon, label, value }: DetailRowProps) => {
  return (
    <div className="detail-row-layout items-center gap-3 rounded-xl bg-surface-soft px-3.5 py-3 text-sm">
      <span className="flex items-center gap-2 text-muted">
        <span className="text-brand">{icon}</span>
        {label}
      </span>
      <strong className="text-left font-black text-ink-soft">{value}</strong>
    </div>
  );
};

interface TimelineRowProps {
  description: string;
  title: string;
}

const TimelineRow = ({ description, title }: TimelineRowProps) => {
  return (
    <div className="timeline-row-layout gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-brand">
        <CalendarClock size={17} />
      </span>
      <div>
        <p className="text-sm font-bold text-ink-soft">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
      </div>
    </div>
  );
};

export default CaseDetail;
