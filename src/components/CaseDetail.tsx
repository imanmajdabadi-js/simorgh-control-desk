import type { CaseType } from '../types';
import { formatMoney, priorityLabels, statusLabels } from '../utils';

interface CaseDetailProps {
  caseItem: CaseType | null;
}

const CaseDetail = ({ caseItem }: CaseDetailProps) => {
  if (!caseItem) {
    return (
      <aside className="h-full rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center">
        <p className="text-lg font-black text-slate-900">No case selected</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Choose a case from the list to see full customer and loss details.
        </p>
      </aside>
    );
  }

  return (
    <aside className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-500">
            Case details
          </p>
          <h2 className="mt-2 text-xl font-black leading-8 text-slate-950">
            {caseItem.title}
          </h2>
        </div>
        {caseItem.isEscalated ? (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            Escalated
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-4">
        <DetailRow label="Customer" value={caseItem.customerName} />
        <DetailRow label="City" value={caseItem.city} />
        <DetailRow label="Assigned to" value={caseItem.assignedTo || 'Unassigned'} />
        <DetailRow label="Priority" value={priorityLabels[caseItem.priority]} />
        <DetailRow label="Status" value={statusLabels[caseItem.status]} />
        <DetailRow label="Estimated loss" value={formatMoney(caseItem.estimatedLoss)} />
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="text-sm font-black text-slate-950">Description</h3>
        <p className="mt-2 text-sm leading-7 text-slate-500">{caseItem.description}</p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="text-sm font-black text-slate-950">Tags</h3>
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
