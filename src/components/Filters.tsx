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
import { SelectField } from './FormControls';

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

        <SelectField
          label="وضعیت"
          name="status"
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as Status | 'all',
            })
          }
          options={[
            { label: 'همه', value: 'all' },
            ...statusOptions.map((option) => ({
              label: statusLabels[option],
              value: option,
            })),
          ]}
          value={filters.status}
        />

        <SelectField
          label="اولویت"
          name="priority"
          onChange={(event) =>
            onChange({
              ...filters,
              priority: event.target.value as Priority | 'all',
            })
          }
          options={[
            { label: 'همه', value: 'all' },
            ...priorityOptions.map((option) => ({
              label: priorityLabels[option],
              value: option,
            })),
          ]}
          value={filters.priority}
        />

        <SelectField
          label="شهر"
          name="city"
          onChange={(event) =>
            onChange({
              ...filters,
              city: event.target.value as City | 'all',
            })
          }
          options={[
            { label: 'همه', value: 'all' },
            ...cityOptions.map((option) => ({
              label: cityLabels[option],
              value: option,
            })),
          ]}
          value={filters.city}
        />

        <SelectField
          label="مرتب‌سازی"
          name="sort"
          onChange={(event) =>
            onChange({ ...filters, sort: event.target.value as CaseSort })
          }
          options={sortOptions}
          value={filters.sort}
        />
      </div>
    </section>
  );
};

export default Filters;
