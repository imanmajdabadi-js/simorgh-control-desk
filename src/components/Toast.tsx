export interface ToastMessage {
  title: string;
  text: string;
  tone: 'success' | 'danger' | 'info';
}

interface ToastProps {
  message: ToastMessage | null;
}

const toneClass = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  danger: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
};

const Toast = ({ message }: ToastProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-30 max-w-sm rounded-3xl border bg-white p-4 shadow-2xl shadow-slate-200">
      <div className={`rounded-2xl border px-4 py-3 ${toneClass[message.tone]}`}>
        <p className="text-sm font-black">{message.title}</p>
        <p className="mt-1 text-xs leading-5 opacity-80">{message.text}</p>
      </div>
    </div>
  );
};

export default Toast;
