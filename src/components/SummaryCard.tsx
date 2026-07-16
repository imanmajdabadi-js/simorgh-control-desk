import type { SummaryType } from '../types';
import Summary from './Summary';

interface SummaryCardProps {
  summarys: SummaryType[];
}

const SummaryCard = ({ summarys }: SummaryCardProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {summarys.map((summary) => {
        return <Summary summary={summary} key={summary.id} />;
      })}
    </section>
  );
};

export default SummaryCard;
