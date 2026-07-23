import { Check, X } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { CaseType, Category, City, Priority, Status } from '../types';
import {
  categoryLabels,
  categoryOptions,
  cityLabels,
  cityOptions,
  getTagsByCategory,
  normalizeNumberInput,
  priorityLabels,
  priorityOptions,
  statusLabels,
  statusOptions,
} from '../utils';
import Button from './Button';

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
  const estimatedLoss = Number(normalizeNumberInput(values.estimatedLoss));

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
    errors.estimatedLoss = 'مبلغ باید عدد معتبر و صفر یا بیشتر باشد.';
  }

  if (!values.description.trim()) {
    errors.description = 'شرح پرونده الزامی است.';
  } else if (values.description.trim().length < 12) {
    errors.description = 'شرح پرونده باید کمی کامل‌تر باشد.';
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

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name as keyof CaseFormErrors]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: undefined,
      }));
    }
  };

  const handleEscalatedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((currentValues) => ({
      ...currentValues,
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

    onSave({
      ...caseItem,
      assignedTo: values.assignedTo.trim(),
      category: values.category,
      city: values.city,
      customerName: values.customerName.trim(),
      description: values.description.trim(),
      estimatedLoss: Number(normalizeNumberInput(values.estimatedLoss)),
      isEscalated: values.isEscalated,
      lastUpdatedAt: new Date().toISOString(),
      priority: values.priority,
      status: values.status,
      tags: getTagsByCategory(values.category),
      title: values.title.trim(),
    });
  };

  return (
    <aside className="rounded-panel border border-stroke bg-surface p-5 shadow-panel xl:sticky xl:top-28">
      <header className="border-b border-stroke-soft pb-5">
        <p className="text-sm font-bold text-brand">
          {mode === 'add' ? 'پرونده تازه' : 'ویرایش پرونده'}
        </p>
        <h2 className="mt-1 text-2xl font-black text-ink">
          {mode === 'add' ? 'ثبت مسئله عملیاتی' : 'اصلاح اطلاعات پرونده'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          اطلاعات ضروری را دقیق و کوتاه ثبت کن.
        </p>
      </header>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <TextField
          autoFocus
          error={errors.title}
          label="عنوان پرونده"
          name="title"
          onChange={handleTextChange}
          value={values.title}
        />

        <TextField
          error={errors.customerName}
          label="نام مشتری"
          name="customerName"
          onChange={handleTextChange}
          value={values.customerName}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <SelectField
            label="نوع سرویس"
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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
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

        <TextField
          label="مسئول پیگیری"
          name="assignedTo"
          onChange={handleTextChange}
          value={values.assignedTo}
        />

        <TextField
          error={errors.estimatedLoss}
          inputMode="numeric"
          label="ضرر احتمالی به تومان"
          name="estimatedLoss"
          onChange={handleTextChange}
          value={values.estimatedLoss}
        />

        <TextareaField
          error={errors.description}
          label="شرح مسئله"
          name="description"
          onChange={handleTextChange}
          value={values.description}
        />

        <label className="flex items-center justify-between gap-4 rounded-xl border border-stroke bg-surface-soft px-4 py-3.5">
          <span>
            <span className="block text-sm font-black text-ink-soft">
              نیازمند توجه مدیر
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted">
              برای پرونده‌های خارج از اختیار کارشناس
            </span>
          </span>
          <input
            checked={values.isEscalated}
            className="h-5 w-5 accent-brand-strong"
            onChange={handleEscalatedChange}
            type="checkbox"
          />
        </label>

        <div className="grid gap-3 pt-2 sm:grid-cols-2 xl:grid-cols-1">
          <Button
            icon={<Check size={18} />}
            type="submit"
            variant="primary"
          >
            {mode === 'add' ? 'ثبت پرونده' : 'ذخیره تغییرات'}
          </Button>
          <Button icon={<X size={18} />} onClick={onCancel} variant="secondary">
            انصراف
          </Button>
        </div>
      </form>
    </aside>
  );
};

interface FieldProps {
  autoFocus?: boolean;
  error?: string;
  inputMode?: 'text' | 'numeric';
  label: string;
  name: keyof CaseFormValues;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  value: string;
}

const fieldClassName =
  'h-12 w-full rounded-control border border-stroke-strong bg-surface-soft px-4 text-body text-ink outline-none transition placeholder:text-muted/75 focus:border-brand focus:bg-surface focus:shadow-focus';

const TextField = ({
  autoFocus,
  error,
  inputMode = 'text',
  label,
  name,
  onChange,
  value,
}: FieldProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink-soft">{label}</span>
      <input
        className={fieldClassName}
        aria-invalid={Boolean(error)}
        autoFocus={autoFocus}
        inputMode={inputMode}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error ? (
        <span className="mt-1.5 block text-xs font-bold text-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
};

interface SelectFieldProps extends Omit<FieldProps, 'autoFocus' | 'value'> {
  options: { label: string; value: string }[];
  value: string;
}

const SelectField = ({
  label,
  name,
  onChange,
  options,
  value,
}: SelectFieldProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink-soft">{label}</span>
      <select
        className={fieldClassName}
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

const TextareaField = ({
  error,
  label,
  name,
  onChange,
  value,
}: FieldProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink-soft">{label}</span>
      <textarea
        className="min-h-32 w-full resize-y rounded-control border border-stroke-strong bg-surface-soft px-4 py-3 text-body text-ink outline-none transition focus:border-brand focus:bg-surface focus:shadow-focus"
        aria-invalid={Boolean(error)}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error ? (
        <span className="mt-1.5 block text-xs font-bold text-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
};

export default CaseForm;
