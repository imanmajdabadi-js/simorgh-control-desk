import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { CaseType, Category, City, Priority, Status } from '../types';
import {
  categoryLabels,
  categoryOptions,
  cityLabels,
  cityOptions,
  getTagsByCategory,
  priorityLabels,
  priorityOptions,
  statusLabels,
  statusOptions,
} from '../utils';

type CaseFormMode = 'add' | 'edit';

interface CaseFormProps {
  caseItem: CaseType | null;
  mode: CaseFormMode;
  onCancel: () => void;
  onSave: (caseItem: CaseType) => void;
}

interface CaseFormValues {
  assignedTo: string;
  category: Category;
  city: City;
  customerName: string;
  description: string;
  estimatedLoss: string;
  isEscalated: boolean;
  priority: Priority;
  status: Status;
  title: string;
}

type CaseFormErrors = Partial<Record<keyof CaseFormValues, string>>;

const getFormValues = (caseItem: CaseType | null): CaseFormValues => ({
  assignedTo: caseItem?.assignedTo || '',
  category: caseItem?.category || 'support',
  city: caseItem?.city || 'Tehran',
  customerName: caseItem?.customerName || '',
  description: caseItem?.description || '',
  estimatedLoss: caseItem ? String(caseItem.estimatedLoss) : '',
  isEscalated: Boolean(caseItem?.isEscalated),
  priority: caseItem?.priority || 'medium',
  status: caseItem?.status || 'open',
  title: caseItem?.title || '',
});

const validateForm = (values: CaseFormValues) => {
  const errors: CaseFormErrors = {};
  const estimatedLoss = Number(values.estimatedLoss);

  if (!values.title.trim()) {
    errors.title = 'عنوان پرونده الزامی است.';
  } else if (values.title.trim().length < 4) {
    errors.title = 'عنوان باید حداقل ۴ کاراکتر باشد.';
  }

  if (!values.customerName.trim()) {
    errors.customerName = 'نام مشتری الزامی است.';
  } else if (values.customerName.trim().length < 3) {
    errors.customerName = 'نام مشتری خیلی کوتاه است.';
  }

  if (!values.estimatedLoss.trim()) {
    errors.estimatedLoss = 'مبلغ ضرر احتمالی الزامی است.';
  } else if (!Number.isFinite(estimatedLoss) || estimatedLoss < 0) {
    errors.estimatedLoss = 'مبلغ باید عدد معتبر و مثبت باشد.';
  }

  if (!values.description.trim()) {
    errors.description = 'توضیحات پرونده الزامی است.';
  } else if (values.description.trim().length < 12) {
    errors.description = 'توضیحات باید کمی کامل‌تر باشد.';
  }

  return errors;
};

const CaseForm = ({ caseItem, mode, onCancel, onSave }: CaseFormProps) => {
  const [values, setValues] = useState(() => getFormValues(caseItem));
  const [errors, setErrors] = useState<CaseFormErrors>({});

  if (!caseItem) {
    return null;
  }

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEscalatedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      isEscalated: event.target.checked,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const savedCase: CaseType = {
      ...caseItem,
      assignedTo: values.assignedTo.trim(),
      category: values.category,
      city: values.city,
      customerName: values.customerName.trim(),
      description: values.description.trim(),
      estimatedLoss: Number(values.estimatedLoss),
      isEscalated: values.isEscalated,
      lastUpdatedAt: new Date().toISOString(),
      priority: values.priority,
      status: values.status,
      tags: getTagsByCategory(values.category),
      title: values.title.trim(),
    };

    onSave(savedCase);
  };

  return (
    <aside className="h-full rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60">
      <div className="border-b border-slate-100 pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-500">
          {mode === 'add' ? 'پرونده جدید' : 'ویرایش پرونده'}
        </p>
        <h2 className="mt-2 text-xl font-black text-slate-950">
          {mode === 'add' ? 'ثبت مورد عملیاتی' : 'اصلاح جزئیات پرونده'}
        </h2>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <TextField
          error={errors.title}
          label="عنوان"
          name="title"
          onChange={handleTextChange}
          value={values.title}
        />

        <TextField
          error={errors.customerName}
          label="مشتری"
          name="customerName"
          onChange={handleTextChange}
          value={values.customerName}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="دسته‌بندی"
            name="category"
            onChange={handleTextChange}
            options={categoryOptions.map((option) => ({
              label: categoryLabels[option],
              value: option,
            }))}
            value={values.category}
          />
          <SelectField
            label="شهر"
            name="city"
            onChange={handleTextChange}
            options={cityOptions.map((option) => ({
              label: cityLabels[option],
              value: option,
            }))}
            value={values.city}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="اولویت"
            name="priority"
            onChange={handleTextChange}
            options={priorityOptions.map((option) => ({
              label: priorityLabels[option],
              value: option,
            }))}
            value={values.priority}
          />
          <SelectField
            label="وضعیت"
            name="status"
            onChange={handleTextChange}
            options={statusOptions.map((option) => ({
              label: statusLabels[option],
              value: option,
            }))}
            value={values.status}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="مسئول"
            name="assignedTo"
            onChange={handleTextChange}
            value={values.assignedTo}
          />
          <TextField
            error={errors.estimatedLoss}
            label="ضرر احتمالی"
            name="estimatedLoss"
            onChange={handleTextChange}
            value={values.estimatedLoss}
          />
        </div>

        <TextareaField
          error={errors.description}
          label="توضیحات"
          name="description"
          onChange={handleTextChange}
          value={values.description}
        />

        <label className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <span>
            <span className="block text-sm font-black text-slate-800">
              پرونده ارجاع‌شده
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              وقتی پرونده نیاز به توجه مدیر دارد، این گزینه را فعال کن.
            </span>
          </span>
          <input
            checked={values.isEscalated}
            className="h-5 w-5 accent-blue-600"
            onChange={handleEscalatedChange}
            type="checkbox"
          />
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            className="h-12 flex-1 rounded-2xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
            type="submit"
          >
            {mode === 'add' ? 'ثبت پرونده' : 'ذخیره تغییرات'}
          </button>
          <button
            className="h-12 flex-1 rounded-2xl border border-slate-200 px-5 text-sm font-black text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            onClick={onCancel}
            type="button"
          >
            انصراف
          </button>
        </div>
      </form>
    </aside>
  );
};

interface FieldProps {
  error?: string;
  label: string;
  name: keyof CaseFormValues;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  value: string;
}

const TextField = ({ error, label, name, onChange, value }: FieldProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        name={name}
        onChange={onChange}
        value={value}
      />
      {error ? <span className="block text-xs font-bold text-rose-600">{error}</span> : null}
    </label>
  );
};

interface SelectFieldProps extends Omit<FieldProps, 'value'> {
  options: { label: string; value: string }[];
  value: string;
}

const SelectField = ({ label, name, onChange, options, value }: SelectFieldProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

const TextareaField = ({ error, label, name, onChange, value }: FieldProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <textarea
        className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        name={name}
        onChange={onChange}
        value={value}
      />
      {error ? <span className="block text-xs font-bold text-rose-600">{error}</span> : null}
    </label>
  );
};

export default CaseForm;
