import simorghImage from '../assets/images/Simorgh.png';
interface HeaderProps {
  totalCases: number;
  onAddCase: () => void;
  onResetCases: () => void;
}

const Header = ({ totalCases, onAddCase, onResetCases }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-700/70 bg-[#020b1c]/90 px-5 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-370 flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4" dir="ltr">
          <div className="grid h-14 w-14 place-items-center rounded-full text-4xl font-black text-white">
            <img src={simorghImage} alt="Simorgh" className="h-full w-full object-cover" />
          </div>
          <div dir="rtl">
            <h1 className="text-2xl font-black tracking-tight text-white">Simorgh Control Desk</h1>
            <p className="mt-1 text-sm text-slate-400">مدیریت پرونده‌های عملیاتی</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4" dir="ltr">
          <button
            className="relative grid h-11 w-11 place-items-center rounded-md border border-slate-700 bg-slate-900/70 text-xl text-slate-300 transition hover:border-blue-400 hover:text-blue-300"
            type="button"
            aria-label="اعلان‌ها"
          >
            ♢
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-blue-400" />
          </button>
          <div className="hidden h-10 w-px bg-slate-700 md:block" />
          <div className="rounded-md px-2 py-1 text-sm text-slate-400" dir="rtl">
            <strong className="me-2 text-xl font-black text-white">{totalCases}</strong>
            پرونده
          </div>
          <button
            className="rounded-md border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm font-black text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-300"
            type="button"
            onClick={onResetCases}
          >
            بازنشانی
          </button>
          <button
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/40 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
            type="button"
            onClick={onAddCase}
          >
            + ثبت پرونده
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
