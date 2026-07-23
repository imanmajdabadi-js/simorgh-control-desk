import { Database, Plus, RotateCcw } from 'lucide-react';
import simorghImage from '../assets/images/Simorgh.png';
import Button from './Button';

interface HeaderProps {
  onAddCase: () => void;
  onResetCases: () => void;
  totalCases: number;
}

const Header = ({ onAddCase, onResetCases, totalCases }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-stroke bg-surface/92 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-control flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-2xl bg-navy shadow-logo sm:h-14 sm:w-14">
            <img
              className="h-full w-full object-cover"
              src={simorghImage}
              alt="نشان سیمرغ"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-xl font-black tracking-tight text-ink sm:text-2xl">
                میز کنترل سیمرغ
              </h1>
              <span className="inline-flex min-h-7 items-center rounded-full border border-blue-200 bg-blue-50 px-3 text-xs font-bold text-brand">
                نسخه نمایشی
              </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-muted">
              مرکز پیگیری اختلال و بازیابی خدمات سفر
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="me-auto inline-flex min-h-12 items-center gap-2.5 rounded-control border border-stroke bg-surface-soft px-4 text-sm text-muted lg:me-0">
            <Database size={18} className="text-brand" />
            <strong className="text-base font-black text-ink">{totalCases}</strong>
            پرونده محلی
          </div>

          <Button
            icon={<RotateCcw size={18} />}
            onClick={onResetCases}
            variant="ghost"
          >
            بازنشانی
          </Button>

          <Button
            icon={<Plus size={19} />}
            onClick={onAddCase}
            variant="primary"
          >
            پرونده جدید
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
