import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

const controlClassName =
  'h-12 w-full rounded-control border border-stroke-strong bg-surface-soft px-4 text-body text-ink outline-none transition placeholder:text-muted/75 focus:border-brand focus:bg-surface focus:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-muted';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export const TextField = ({
  className = '',
  error,
  label,
  name,
  ...inputProps
}: TextFieldProps) => {
  const errorId = name ? `${name}-error` : undefined;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink-soft">{label}</span>
      <input
        {...inputProps}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={`${controlClassName} ${className}`}
        name={name}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
};

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label: string;
  options: SelectOption[];
}

export const SelectField = ({
  className = '',
  error,
  label,
  name,
  options,
  ...selectProps
}: SelectFieldProps) => {
  const errorId = name ? `${name}-error` : undefined;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink-soft">{label}</span>
      <select
        {...selectProps}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={`${controlClassName} ${className}`}
        name={name}
      >
        {options.map((option) => (
          <option
            disabled={option.disabled}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </label>
  );
};

interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label: string;
}

export const TextareaField = ({
  className = '',
  error,
  label,
  name,
  ...textareaProps
}: TextareaFieldProps) => {
  const errorId = name ? `${name}-error` : undefined;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink-soft">{label}</span>
      <textarea
        {...textareaProps}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={`min-h-32 w-full resize-y rounded-control border border-stroke-strong bg-surface-soft px-4 py-3 text-body text-ink outline-none transition focus:border-brand focus:bg-surface focus:shadow-focus ${className}`}
        name={name}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
};

interface FieldErrorProps {
  id?: string;
  message?: string;
}

const FieldError = ({ id, message }: FieldErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <span
      className="mt-1.5 block text-xs font-bold text-danger"
      id={id}
      role="alert"
    >
      {message}
    </span>
  );
};
