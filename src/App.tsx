import { Toaster } from 'sonner';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Dashboard />
      <Toaster
        closeButton
        dir="rtl"
        duration={3200}
        position="bottom-left"
        richColors
        toastOptions={{
          className: 'font-sans',
          style: {
            borderRadius: '14px',
            fontFamily: 'Vazirmatn Variable, Tahoma, sans-serif',
            fontSize: '14px',
            padding: '16px',
          },
        }}
      />
    </>
  );
}

export default App;
