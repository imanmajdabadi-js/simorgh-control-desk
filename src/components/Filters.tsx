import type { CaseFilters, CaseSort, City, Priority, Status } from '../types';
import {
  cityLabels,
  cityOptions,
  priorityLabels,
  priorityOptions,
  sortOptions,
  statusLabels,
  statusOptions,
} from '../utils';

interface FiltersProps {
  filters: CaseFilters;
  onChange: (filters: CaseFilters) => void;
  onReset: () => void;
}

const Filters = ({ filters, onChange, onReset }: FiltersProps) => {
  return (
    <aside className="h-full rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-500">کنترل</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">فیلترها</h2>
        </div>
        <button
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-500 transition hover:border-blue-300 hover:text-blue-600"
          type="button"
          onClick={onReset}
        >
          پاک کردن
        </button>
      </div>

      <div className="space-y-4">
        <FilterSelect
          label="وضعیت"
          value={filters.status}
          options={statusOptions.map((option) => ({
            label: statusLabels[option],
            value: option,
          }))}
          onChange={(value) => onChange({ ...filters, status: value as Status | 'all' })}
        />
        <FilterSelect
          label="اولویت"
          value={filters.priority}
          options={priorityOptions.map((option) => ({
            label: priorityLabels[option],
            value: option,
          }))}
          onChange={(value) => onChange({ ...filters, priority: value as Priority | 'all' })}
        />
        <FilterSelect
          label="شهر"
          value={filters.city}
          options={cityOptions.map((option) => ({
            label: cityLabels[option],
            value: option,
          }))}
          onChange={(value) => onChange({ ...filters, city: value as City | 'all' })}
        />

        <label className="block space-y-2">
          <span className="text-sm font-bold text-slate-700">جستجو</span>
          <input
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="جستجو در پرونده‌ها..."
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-slate-700">مرتب‌سازی</span>
          <select
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            value={filters.sort}
            onChange={(event) => onChange({ ...filters, sort: event.target.value as CaseSort })}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
};

interface FilterSelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const FilterSelect = ({ label, value, options, onChange }: FilterSelectProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="all">همه</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Filters;
