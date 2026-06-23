import type { SummaryType } from '../types';
import Summary from './Summary';

interface SummaryCardProps {
  summarys: SummaryType[];
}

const SummaryCard = ({ summarys }: SummaryCardProps) => {
  return (
    <div className="grid grid-cols-5 m-2">
      {summarys.map((summary) => {
        return <Summary summary={summary} key={summary.id} />;
      })}
    </div>
  );
};

export default SummaryCard;
