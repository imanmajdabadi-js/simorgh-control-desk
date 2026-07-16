export interface ToastMessage {
  title: string;
  text: string;
  tone: 'success' | 'danger' | 'info';
}

interface ToastProps {
  message: ToastMessage | null;
}

const toneClass = {
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  danger: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  info: 'border-blue-500/40 bg-blue-500/10 text-blue-200',
};

const Toast = ({ message }: ToastProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-30 max-w-sm rounded-md border border-slate-700 bg-slate-950/95 p-3 shadow-2xl shadow-black/40">
      <div className={`rounded-md border px-4 py-3 ${toneClass[message.tone]}`}>
        <p className="text-sm font-black">{message.title}</p>
        <p className="mt-1 text-xs leading-5 opacity-80">{message.text}</p>
      </div>
    </div>
  );
};

export default Toast;
