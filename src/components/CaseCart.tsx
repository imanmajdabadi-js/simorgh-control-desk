import type { CaseCardShow } from '../types';

export interface CaseCartProps {
  caseItem: CaseCardShow;
}

const CaseCart = ({ caseItem }: CaseCartProps) => {
  return (
    <div className="grid grid-cols-3 border rounded-2xl w-2/4 p-4 my-2">
      <div>
        <p>title:{caseItem.title}</p>
        <p>customerName:{caseItem.customerName}</p>
        <p>status:{caseItem.status}</p>
      </div>

      <div>
        <p>City:{caseItem.city}</p>
        <p>estimatedLoss:{caseItem.estimatedLoss}</p>
        <p>priority:{caseItem.priority}</p>
      </div>
      <div className="flex items-center gap-4">
        <button>View</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default CaseCart;
