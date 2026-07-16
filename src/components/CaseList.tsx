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
      <div className="grid min-h-80 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <div>
          <p className="text-lg font-black text-slate-900">پرونده‌ای پیدا نشد</p>
          <p className="mt-2 text-sm text-slate-500">
            فیلترها یا متن جستجو را تغییر بده.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cases.map((caseItem, index) => {
        return (
          <CaseCart
            isEditing={editingCaseId === caseItem.id}
            isSelected={selectedCaseId === caseItem.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onView={onView}
            count={index + 1}
            key={caseItem.id}
            caseItem={caseItem}
          />
        );
      })}
    </div>
  );
};

export default CaseList;
