interface HeaderProps {
  totalCases: number;
  onAddCase: () => void;
}

const Header = ({ totalCases, onAddCase }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/80 px-5 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-3xl bg-slate-950 text-2xl text-white shadow-xl">
            S
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-500">
              Simorgh
            </p>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              Control Desk
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
            <span className="text-slate-500">Total cases</span>
            <strong className="ml-2 text-slate-950">{totalCases}</strong>
          </div>
          <button
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
            type="button"
            onClick={onAddCase}
          >
            + Add Case
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
