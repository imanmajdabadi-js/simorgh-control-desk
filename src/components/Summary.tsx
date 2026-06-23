import type { SummaryType } from '../types';

interface SummaryProps {
  summary: SummaryType;
}
const Summary = ({ summary }: SummaryProps) => {
  return (
    <div className="border rounded-2xl p-4 w-72">
      <p>{summary.number}</p>
      <p>{summary.title}</p>
    </div>
  );
};

export default Summary;
