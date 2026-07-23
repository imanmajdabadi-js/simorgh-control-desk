import { Filter, RotateCcw, Search } from 'lucide-react';
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
import Button from './Button';

interface FiltersProps {
  filters: CaseFilters;
  onChange: (filters: CaseFilters) => void;
  onReset: () => void;
}

const Filters = ({ filters, onChange, onReset }: FiltersProps) => {
  const selectedFilterCount = [
    filters.status,
    filters.priority,
    filters.city,
  ].filter((filter) => filter !== 'all').length;
  const activeFilters =
    selectedFilterCount +
    Number(Boolean(filters.search.trim())) +
    Number(filters.sort !== 'newest');

  return (
    <section className="rounded-panel border border-stroke bg-surface p-4 shadow-panel sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-brand">
            <Filter size={21} />
          </span>
          <div>
            <h2 className="text-lg font-black text-ink">جستجو و پالایش پرونده‌ها</h2>
            <p className="mt-0.5 text-sm text-muted">
              {activeFilters === 0
                ? 'همه پرونده‌ها نمایش داده می‌شوند'
                : `${activeFilters} انتخاب فعال است`}
            </p>
          </div>
        </div>

        <Button
          disabled={activeFilters === 0}
          icon={<RotateCcw size={17} />}
          onClick={onReset}
          size="sm"
          variant="ghost"
        >
          پاک‌کردن فیلترها
        </Button>
      </header>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <label className="relative block xl:col-span-2">
          <span className="mb-2 block text-sm font-bold text-ink-soft">جستجو</span>
          <Search
            className="pointer-events-none absolute bottom-3.5 right-4 text-muted"
            size={19}
          />
          <input
            className="h-12 w-full rounded-control border border-stroke-strong bg-surface-soft pe-4 ps-11 text-body text-ink outline-none transition placeholder:text-muted/75 focus:border-brand focus:bg-surface focus:shadow-focus"
            onChange={(event) =>
              onChange({ ...filters, search: event.target.value })
            }
            placeholder="عنوان، مشتری یا برچسب"
            type="search"
            value={filters.search}
          />
        </label>

        <FilterSelect
          label="وضعیت"
          onChange={(value) =>
            onChange({ ...filters, status: value as Status | 'all' })
          }
          options={statusOptions.map((option) => ({
            label: statusLabels[option],
            value: option,
          }))}
          value={filters.status}
        />

        <FilterSelect
          label="اولویت"
          onChange={(value) =>
            onChange({ ...filters, priority: value as Priority | 'all' })
          }
          options={priorityOptions.map((option) => ({
            label: priorityLabels[option],
            value: option,
          }))}
          value={filters.priority}
        />

        <FilterSelect
          label="شهر"
          onChange={(value) =>
            onChange({ ...filters, city: value as City | 'all' })
          }
          options={cityOptions.map((option) => ({
            label: cityLabels[option],
            value: option,
          }))}
          value={filters.city}
        />

        <FilterSelect
          label="مرتب‌سازی"
          onChange={(value) =>
            onChange({ ...filters, sort: value as CaseSort })
          }
          options={sortOptions}
          showAllOption={false}
          value={filters.sort}
        />
      </div>
    </section>
  );
};

interface FilterSelectProps {
  label: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  showAllOption?: boolean;
  value: string;
}

const FilterSelect = ({
  label,
  onChange,
  options,
  showAllOption = true,
  value,
}: FilterSelectProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink-soft">{label}</span>
      <select
        className="h-12 w-full rounded-control border border-stroke-strong bg-surface-soft px-3 text-body text-ink outline-none transition focus:border-brand focus:bg-surface focus:shadow-focus"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {showAllOption ? <option value="all">همه</option> : null}
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
