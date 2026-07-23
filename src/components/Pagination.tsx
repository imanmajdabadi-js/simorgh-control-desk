import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  onChange: (page: number) => void;
  pageCount: number;
}

const Pagination = ({ currentPage, onChange, pageCount }: PaginationProps) => {
  if (pageCount <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      className="mt-6 flex flex-wrap items-center justify-center gap-2"
      aria-label="صفحه‌بندی پرونده‌ها"
      dir="ltr"
    >
      <button
        className="grid h-11 w-11 place-items-center rounded-control border border-stroke-strong bg-surface text-ink-soft transition hover:border-brand hover:text-brand disabled:opacity-35"
        aria-label="صفحه قبل"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        type="button"
      >
        <ChevronLeft size={19} />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          className={`grid h-11 min-w-11 place-items-center rounded-control border px-2 text-sm font-black transition ${
            currentPage === pageNumber
              ? 'border-brand-strong bg-brand-strong text-white shadow-action'
              : 'border-stroke-strong bg-surface text-ink-soft hover:border-brand hover:text-brand'
          }`}
          aria-current={currentPage === pageNumber ? 'page' : undefined}
          aria-label={`صفحه ${pageNumber}`}
          key={pageNumber}
          onClick={() => onChange(pageNumber)}
          type="button"
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="grid h-11 w-11 place-items-center rounded-control border border-stroke-strong bg-surface text-ink-soft transition hover:border-brand hover:text-brand disabled:opacity-35"
        aria-label="صفحه بعد"
        disabled={currentPage === pageCount}
        onClick={() => onChange(currentPage + 1)}
        type="button"
      >
        <ChevronRight size={19} />
      </button>
    </nav>
  );
};

export default Pagination;
