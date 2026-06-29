import type { CaseType } from '../types';
import CaseCart from './CaseCart';

interface CaseListProps {
  cases: CaseType[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  editingCaseId: string | null;
}

const CaseList = ({ cases, onDelete, onEdit, editingCaseId }: CaseListProps) => {
  return (
    <div className="grid place-items-center w-full">
      {cases.map((caseItem, index) => {
        return (
          <CaseCart
            isEditing={editingCaseId === caseItem.id}
            onEdit={onEdit}
            onDelete={onDelete}
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
