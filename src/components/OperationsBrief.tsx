import { ArrowLeft, CircleAlert, UserRoundX } from 'lucide-react';
import type { ReactNode } from 'react';
import Button from './Button';

interface OperationsBriefProps {
  criticalCases: number;
  escalatedCases: number;
  onShowCritical: () => void;
  unassignedCases: number;
}

const OperationsBrief = ({
  criticalCases,
  escalatedCases,
  onShowCritical,
  unassignedCases,
}: OperationsBriefProps) => {
  const hasCriticalCases = criticalCases > 0;

  return (
    <section className="relative overflow-hidden rounded-hero bg-navy px-5 py-6 text-white shadow-hero sm:px-8 sm:py-8">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-20 right-1/3 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-gold via-blue-400 to-transparent" />

      <div className="brief-layout relative gap-7">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-blue-200">
            <CircleAlert size={18} />
            تصویر لحظه‌ای شیفت
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-relaxed tracking-tight sm:text-4xl">
            پرونده‌های حساس را قبل از تبدیل‌شدن به تجربه بد مشتری پیدا کن.
          </h2>
          <p className="mt-3 max-w-2xl text-body leading-8 text-slate-300">
            این میز یک نمای متمرکز از ریسک‌های رزرو، پرداخت، انتقال فرودگاهی و
            بازپرداخت در اختیار کارشناس عملیات قرار می‌دهد.
          </p>
        </div>

        <Button
          className="w-full xl:w-auto"
          disabled={!hasCriticalCases}
          icon={<ArrowLeft size={19} />}
          onClick={onShowCritical}
          variant="light"
        >
          {hasCriticalCases ? 'دیدن پرونده‌های بحرانی' : 'پرونده بحرانی نداریم'}
        </Button>
      </div>

      <div className="relative mt-7 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
        <BriefMetric
          label="پرونده بحرانی"
          value={criticalCases}
          description="نیازمند اقدام فوری"
        />
        <BriefMetric
          label="ارجاع به مدیر"
          value={escalatedCases}
          description="خارج از اختیار کارشناس"
        />
        <BriefMetric
          label="بدون مسئول"
          value={unassignedCases}
          description="در خطر فراموش‌شدن"
          icon={<UserRoundX size={18} />}
        />
      </div>
    </section>
  );
};

interface BriefMetricProps {
  description: string;
  icon?: ReactNode;
  label: string;
  value: number;
}

const BriefMetric = ({ description, icon, label, value }: BriefMetricProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-200">{label}</span>
        {icon ? <span className="text-blue-200">{icon}</span> : null}
      </div>
      <strong className="mt-2 block text-3xl font-black">{value}</strong>
      <span className="mt-1 block text-xs leading-5 text-slate-400">
        {description}
      </span>
    </div>
  );
};

export default OperationsBrief;
