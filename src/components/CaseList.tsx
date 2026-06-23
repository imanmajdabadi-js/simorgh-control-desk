import type { CaseCardShow } from '../types';
import CaseCart from './CaseCart';

interface CaseListProps {
  cases: CaseCardShow[];
}

const CaseList = ({ cases }: CaseListProps) => {
  return (
    <div>
      {cases.map((item) => {
        return <CaseCart key={item.id} caseItem={item} />;
      })}
    </div>
  );
};

export default CaseList;
