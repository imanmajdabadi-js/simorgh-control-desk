import { SearchX } from 'lucide-react';
import type { CaseType, Status } from '../types';
import CaseCard from './CaseCard';

interface CaseListProps {
  cases: CaseType[];
  editingCaseId: string | null;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onView: (id: string) => void;
  selectedCaseId: string;
}

const CaseList = ({
  cases,
  editingCaseId,
  onDelete,
  onEdit,
  onStatusChange,
  onView,
  selectedCaseId,
}: CaseListProps) => {
  if (cases.length === 0) {
    return (
      <div className="grid min-h-80 place-items-center rounded-2xl border border-dashed border-stroke-strong bg-surface-soft p-8 text-center">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-brand">
            <SearchX size={26} />
          </span>
          <p className="mt-4 text-xl font-black text-ink">پرونده‌ای پیدا نشد</p>
          <p className="mt-2 text-body text-muted">
            عبارت جستجو یا فیلترها را تغییر بده.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <CaseCard
          caseItem={caseItem}
          isEditing={editingCaseId === caseItem.id}
          isSelected={selectedCaseId === caseItem.id}
          key={caseItem.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default CaseList;
