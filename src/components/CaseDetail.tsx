import type { City, Priority, Status } from '../types';

interface CaseItem {
  title: string;
  customer: string;
  city: City;
  priority: Priority;
  status: Status;
  estimatedLoss: number;
  description: string;
}

interface CaseDetailProps {
  caseItem: CaseItem;
}

const CaseDetail = ({ caseItem }: CaseDetailProps) => {
  return (
    <div className="">
      <div className="border-b w-full p-4">
        <h2>Case Detail</h2>
        {/* icon */}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="">Title:</label>
        <p>{caseItem.city}</p>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="">City:</label>
        <p>{caseItem.city}</p>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="">priority:</label>
        <p>{caseItem.priority}</p>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="">status:</label>
        <p>{caseItem.status}</p>
      </div>

      <div className="flex items-center gap-2 border-b">
        <label htmlFor="">estimatedLoss:</label>
        <p>{caseItem.estimatedLoss}</p>
      </div>

      <div className="flex items-center gap-2 border-b">
        <label htmlFor="">description:</label>
        <p>{caseItem.description}</p>
      </div>

      <div className="flex justify-center mt-2 cursor-pointer">
        <button className="px-4 py-1 rounded-md bg-blue-600 text-sm cursor-pointer text-white">
          Edit Case
        </button>
      </div>
    </div>
  );
};

export default CaseDetail;
