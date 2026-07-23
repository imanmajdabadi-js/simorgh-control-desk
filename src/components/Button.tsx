import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'light';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-brand-strong bg-brand-strong text-white shadow-action hover:border-blue-700 hover:bg-blue-700',
  secondary:
    'border-stroke-strong bg-surface text-ink-soft hover:border-brand hover:text-brand',
  ghost:
    'border-transparent bg-transparent text-ink-soft hover:border-stroke hover:bg-surface-raised',
  danger:
    'border-danger/20 bg-danger-soft text-danger hover:border-danger/35 hover:bg-rose-100',
  light:
    'border-white/20 bg-white text-navy shadow-action hover:border-white hover:bg-blue-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 rounded-control px-3.5 text-sm',
  md: 'min-h-12 rounded-control px-5 text-body',
};

const Button = ({
  children,
  className = '',
  icon,
  size = 'md',
  type = 'button',
  variant = 'secondary',
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 border font-bold transition duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-45 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      type={type}
      {...buttonProps}
    >
      {icon ? <span className="shrink-0" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
