import {
  Eye,
  MapPin,
  Pencil,
  Trash2,
  UserRound,
  WalletCards,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { CaseType, Status } from '../types';
import {
  cityLabels,
  formatMoney,
  statusLabels,
  statusOptions,
} from '../utils';
import Button from './Button';
import { EscalatedBadge, PriorityBadge, StatusBadge } from './CaseBadges';

export interface CaseCardProps {
  caseItem: CaseType;
  isEditing: boolean;
  isSelected: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onView: (id: string) => void;
}

const CaseCard = ({
  caseItem,
  isEditing,
  isSelected,
  onDelete,
  onEdit,
  onStatusChange,
  onView,
}: CaseCardProps) => {
  const caseCode = `SC-${1040 + Number(caseItem.id)}`;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border bg-surface transition duration-200 ${
        isSelected
          ? 'border-brand shadow-selected'
          : 'border-stroke hover:border-stroke-strong hover:shadow-card'
      }`}
    >
      <span
        className={`absolute inset-y-0 right-0 w-1 ${
          caseItem.priority === 'critical'
            ? 'bg-danger'
            : caseItem.priority === 'high'
              ? 'bg-warning'
              : 'bg-brand/55'
        }`}
      />

      <div className="p-4 pe-5 sm:p-5 sm:pe-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-caption font-black text-brand">
                {caseCode}
              </span>
              <h3 className="text-card-title font-black text-ink">
                {caseItem.title}
              </h3>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <MetaItem icon={<UserRound size={16} />} text={caseItem.customerName} />
              <MetaItem icon={<MapPin size={16} />} text={cityLabels[caseItem.city]} />
              <MetaItem
                icon={<UserRound size={16} />}
                text={caseItem.assignedTo || 'بدون مسئول'}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge status={caseItem.status} />
            <PriorityBadge priority={caseItem.priority} />
            {caseItem.isEscalated ? <EscalatedBadge /> : null}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface-soft px-3.5 py-3 text-sm text-ink-soft">
          <WalletCards size={18} className="text-warning" />
          <span className="text-muted">ضرر احتمالی</span>
          <strong className="font-black text-ink">
            {formatMoney(caseItem.estimatedLoss)}
          </strong>
        </div>
      </div>

      <footer className="flex flex-col gap-3 border-t border-stroke-soft bg-surface-soft/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <label className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted">وضعیت</span>
          <select
            className="h-11 min-w-36 rounded-control border border-stroke-strong bg-surface px-3 text-sm font-bold text-ink outline-none transition hover:border-brand focus:border-brand focus:shadow-focus"
            aria-label={`تغییر وضعیت پرونده ${caseCode}`}
            onChange={(event) =>
              onStatusChange(caseItem.id, event.target.value as Status)
            }
            value={caseItem.status}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-2">
          <Button
            icon={<Eye size={17} />}
            onClick={() => onView(caseItem.id)}
            size="sm"
            variant="ghost"
          >
            مشاهده
          </Button>
          <Button
            icon={<Pencil size={16} />}
            onClick={() => onEdit(caseItem.id)}
            size="sm"
            variant="secondary"
          >
            {isEditing ? 'در حال ویرایش' : 'ویرایش'}
          </Button>
          <Button
            icon={<Trash2 size={16} />}
            onClick={() => onDelete(caseItem.id)}
            size="sm"
            variant="danger"
          >
            حذف
          </Button>
        </div>
      </footer>
    </article>
  );
};

interface MetaItemProps {
  icon: ReactNode;
  text: string;
}

const MetaItem = ({ icon, text }: MetaItemProps) => {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-muted">{icon}</span>
      {text}
    </span>
  );
};

export default CaseCard;
