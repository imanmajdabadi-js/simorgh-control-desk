import { AlertTriangle, RotateCcw, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import Button from './Button';

interface ConfirmDialogProps {
  cancelLabel?: string;
  confirmLabel: string;
  description: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  tone: 'danger' | 'warning';
}

const ConfirmDialog = ({
  cancelLabel = 'انصراف',
  confirmLabel,
  description,
  isOpen,
  onCancel,
  onConfirm,
  title,
  tone,
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  const icon =
    tone === 'danger' ? <Trash2 size={24} /> : <RotateCcw size={24} />;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <section
        className="w-full max-w-md animate-dialog rounded-dialog border border-stroke bg-surface p-5 shadow-dialog sm:p-6"
        aria-describedby="confirm-dialog-description"
        aria-labelledby="confirm-dialog-title"
        aria-modal="true"
        dir="rtl"
        role="dialog"
      >
        <div className="flex items-start gap-4">
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
              tone === 'danger'
                ? 'bg-danger-soft text-danger'
                : 'bg-warning-soft text-warning'
            }`}
          >
            {icon}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h2 id="confirm-dialog-title" className="text-xl font-black text-ink">
                {title}
              </h2>
              <button
                className="grid h-11 w-11 shrink-0 place-items-center rounded-control text-muted transition hover:bg-surface-raised hover:text-ink"
                aria-label="بستن پنجره تأیید"
                onClick={onCancel}
                type="button"
              >
                <X size={20} />
              </button>
            </div>
            <p
              id="confirm-dialog-description"
              className="mt-2 text-body text-muted"
            >
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button autoFocus onClick={onCancel} variant="secondary">
            {cancelLabel}
          </Button>
          <Button
            icon={tone === 'danger' ? <AlertTriangle size={18} /> : icon}
            onClick={onConfirm}
            variant={tone === 'danger' ? 'danger' : 'primary'}
          >
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ConfirmDialog;
