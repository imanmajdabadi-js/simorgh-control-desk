import type { SummaryItem } from './Summary';
import Summary from './Summary';

export type { SummaryItem } from './Summary';

interface SummaryCardProps {
  summaries: SummaryItem[];
}

const SummaryCard = ({ summaries }: SummaryCardProps) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaries.map((summary) => (
        <Summary key={summary.id} summary={summary} />
      ))}
    </section>
  );
};

export default SummaryCard;
