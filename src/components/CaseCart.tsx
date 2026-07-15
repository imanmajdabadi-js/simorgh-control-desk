import type { CaseType } from '../types';

export interface CaseCardProps {
  caseItem: CaseType;
  count: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isEditing: boolean;
}

const CaseCard = ({ caseItem, count, onDelete, onEdit, isEditing }: CaseCardProps) => {
  const textClass = 'text-white text-sm truncate';
  const buttonClass = 'rounded-md py-1 px-3 text-white text-sm cursor-pointer whitespace-nowrap';

  return (
    <article className="grid w-full max-w-3xl grid-cols-[48px_minmax(0,1.5fr)_minmax(0,1fr)_auto] items-center gap-4 my-2 rounded-2xl border bg-gray-500 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-blue-600 text-sm text-white">
        {count}
      </div>

      <div className="min-w-0">
        <p className={textClass}>Title: {caseItem.title}</p>
        <p className={textClass}>Customer: {caseItem.customerName}</p>
        {!isEditing ? (
          <p className={textClass}>Status: {caseItem.status}</p>
        ) : (
          <input className="border p-0 m-0 text-sm text-ce w-20 rounded-md" type="text" />
        )}
      </div>

      <div className="min-w-0">
        {!isEditing ? (
          <p className={textClass}>City: {caseItem.city}</p>
        ) : (
          <input className="border p-0 m-0 text-sm text-ce w-20 rounded-md" type="text" />
        )}
        {!isEditing ? (
          <p className={textClass}>Loss: {caseItem.estimatedLoss}</p>
        ) : (
          <input className="border p-0 m-0 text-sm text-ce w-20 rounded-md" type="number" />
        )}
        {!isEditing ? (
          <p className={textClass}>Priority: {caseItem.priority}</p>
        ) : (
          <input className="border p-0 m-0 text-sm text-ce w-20 rounded-md" type="text" />
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {!isEditing ? (
          <>
            <button className={`bg-blue-700 ${buttonClass}`}>View</button>
            <button onClick={() => onEdit(caseItem.id)} className={`bg-green-700 ${buttonClass}`}>
              Edit
            </button>
            <button onClick={() => onDelete(caseItem.id)} className={`bg-red-700 ${buttonClass}`}>
              Delete
            </button>
          </>
        ) : (
          <>
            <button className={`bg-sky-950 ${buttonClass}`}>Save</button>
            <button className={`bg-amber-500 ${buttonClass}`}>Cancel</button>
          </>
        )}
      </div>
    </article>
  );
};

export default CaseCard;
