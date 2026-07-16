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
  const activeFilters = [filters.status, filters.priority, filters.city].filter(
    (filter) => filter !== 'all',
  ).length;

  return (
    <aside
      className="h-full rounded-md border border-slate-700/80 bg-slate-900/60 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.22)]"
      dir="rtl"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">فیلترها</h2>
        </div>
        <button
          className="rounded-md border border-slate-700 px-3 py-1 text-xs font-bold text-slate-400 transition hover:border-blue-400 hover:text-blue-300"
          type="button"
          onClick={onReset}
        >
          پاک کردن
        </button>
      </div>

      <div className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-bold text-slate-300">جستجو</span>
          <input
            className="h-11 w-full rounded-md border border-slate-700 bg-[#071528] px-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            placeholder="جستجو در پرونده‌ها..."
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
          />
        </label>

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
          <span className="text-sm font-bold text-slate-300">مرتب‌سازی</span>
          <select
            className="h-11 w-full rounded-md border border-slate-700 bg-[#071528] px-4 text-sm text-slate-200 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
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

        <div className="flex items-center gap-2 pt-3 text-sm text-blue-300">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          {activeFilters} فیلتر فعال
        </div>
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
      <span className="text-sm font-bold text-slate-300">{label}</span>
      <select
        className="h-11 w-full rounded-md border border-slate-700 bg-[#071528] px-4 text-sm text-slate-200 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
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
