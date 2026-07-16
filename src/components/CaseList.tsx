import type { CaseType, Status } from '../types';
import CaseCart from './CaseCart';

interface CaseListProps {
  cases: CaseType[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onView: (id: string) => void;
  editingCaseId: string | null;
  selectedCaseId: string;
}

const CaseList = ({
  cases,
  onDelete,
  onEdit,
  onStatusChange,
  onView,
  editingCaseId,
  selectedCaseId,
}: CaseListProps) => {
  if (cases.length === 0) {
    return (
      <div className="grid min-h-80 place-items-center rounded-md border border-dashed border-slate-700 bg-slate-950/30 p-8 text-center">
        <div>
          <p className="text-lg font-black text-white">پرونده‌ای پیدا نشد</p>
          <p className="mt-2 text-sm text-slate-400">
            فیلترها یا متن جستجو را تغییر بده.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cases.map((caseItem) => {
        return (
          <CaseCart
            isEditing={editingCaseId === caseItem.id}
            isSelected={selectedCaseId === caseItem.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onView={onView}
            key={caseItem.id}
            caseItem={caseItem}
          />
        );
      })}
    </div>
  );
};

export default CaseList;
