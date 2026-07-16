import { useEffect, useMemo, useState } from 'react';
import { initialCases } from '../data/data';
import { loadCases, saveCases } from '../services';
import type { CaseFilters, CaseType, Status, SummaryType } from '../types';
import { filterCases, formatMoney, getCaseStats } from '../utils';
import CaseDetail from './CaseDetail';
import CaseForm from './CaseForm';
import CaseList from './CaseList';
import Filters from './Filters';
import Header from './Header';
import SummaryCard from './SummaryCard';
import Toast, { type ToastMessage } from './Toast';

const initialFilters: CaseFilters = {
  status: 'all',
  priority: 'all',
  city: 'all',
  search: '',
  sort: 'newest',
};

type FormMode = 'add' | 'edit' | null;

const Dashboard = () => {
  const [caseList, setCaseList] = useState<CaseType[]>(() => loadCases(initialCases));
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [caseFormItem, setCaseFormItem] = useState<CaseType | null>(null);
  const [filters, setFilters] = useState<CaseFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCaseId, setSelectedCaseId] = useState(
    () => loadCases(initialCases)[0]?.id || '',
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const visibleCases = useMemo(() => filterCases(caseList, filters), [caseList, filters]);
  const stats = useMemo(() => getCaseStats(caseList), [caseList]);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(visibleCases.length / pageSize));
  const activePage = Math.min(currentPage, pageCount);
  const firstCaseIndex = (activePage - 1) * pageSize;
  const firstVisibleCase = visibleCases.length === 0 ? 0 : firstCaseIndex + 1;
  const pageCases = visibleCases.slice(firstCaseIndex, firstCaseIndex + pageSize);
  const selectedCase = caseList.find((caseItem) => caseItem.id === selectedCaseId) || null;
  const editingCaseId = formMode === 'edit' ? caseFormItem?.id || null : null;

  useEffect(() => {
    saveCases(caseList);
  }, [caseList]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2800);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const summaryItems: SummaryType[] = [
    {
      id: 'total',
      title: 'کل پرونده‌ها',
      value: stats.totalCases.toString(),
      caption: 'همه موارد ثبت‌شده عملیاتی',
      accent: 'blue',
      icon: '▤',
    },
    {
      id: 'open',
      title: 'پرونده‌های باز',
      value: stats.openCases.toString(),
      caption: 'مواردی که هنوز نیاز به اقدام دارند',
      accent: 'green',
      icon: '↗',
    },
    {
      id: 'priority',
      title: 'بحرانی',
      value: stats.criticalCases.toString(),
      caption: 'مواردی که باید زودتر دیده شوند',
      accent: 'rose',
      icon: '!',
    },
    {
      id: 'loss',
      title: 'ضرر احتمالی',
      value: formatMoney(stats.totalLoss),
      caption: 'جمع اثر مالی پرونده‌ها',
      accent: 'blue',
      icon: '$',
    },
    {
      id: 'escalated',
      title: 'ارجاع‌شده',
      value: stats.escalatedCases.toString(),
      caption: 'پرونده‌های نیازمند توجه مدیر',
      accent: 'violet',
      icon: '↑',
    },
  ];

  const showToast = (message: ToastMessage) => {
    setToast(message);
  };

  const createDraftCase = (): CaseType => {
    const lastId = Math.max(0, ...caseList.map((caseItem) => Number(caseItem.id)));
    const now = new Date().toISOString();

    return {
      id: String(lastId + 1),
      title: '',
      customerName: '',
      category: 'support',
      city: 'Tehran',
      priority: 'medium',
      status: 'open',
      assignedTo: '',
      estimatedLoss: 0,
      createdAt: now,
      lastUpdatedAt: now,
      description: '',
      tags: ['support'],
      isEscalated: false,
    };
  };

  const handleDelete = (id: string) => {
    const nextCases = caseList.filter((item) => item.id !== id);
    setCaseList(nextCases);

    if (selectedCaseId === id) {
      setSelectedCaseId(nextCases[0]?.id || '');
    }

    if (caseFormItem?.id === id) {
      setCaseFormItem(null);
      setFormMode(null);
    }

    showToast({
      title: 'پرونده حذف شد',
      text: 'مورد انتخاب‌شده از میز عملیات حذف شد.',
      tone: 'danger',
    });
  };

  const handleEdit = (id: string) => {
    const caseToEdit = caseList.find((caseItem) => caseItem.id === id);

    if (!caseToEdit) {
      return;
    }

    setFormMode('edit');
    setCaseFormItem(caseToEdit);
    setSelectedCaseId(id);
  };

  const handleStatusChange = (id: string, status: Status) => {
    const now = new Date().toISOString();

    setCaseList((prev) =>
      prev.map((caseItem) =>
        caseItem.id === id ? { ...caseItem, status, lastUpdatedAt: now } : caseItem,
      ),
    );

    setCaseFormItem((prev) =>
      prev?.id === id ? { ...prev, status, lastUpdatedAt: now } : prev,
    );

    showToast({
      title: 'وضعیت تغییر کرد',
      text: 'وضعیت پرونده بدون باز کردن فرم کامل به‌روزرسانی شد.',
      tone: 'info',
    });
  };

  const handleAddCase = () => {
    const draftCase = createDraftCase();

    setFormMode('add');
    setCaseFormItem(draftCase);
    setSelectedCaseId('');
    setCurrentPage(1);
  };

  const handleSaveCase = (savedCase: CaseType) => {
    if (formMode === 'add') {
      setCaseList((prev) => [savedCase, ...prev]);
      showToast({
        title: 'پرونده ثبت شد',
        text: 'مورد جدید به لیست عملیات اضافه شد.',
        tone: 'success',
      });
    }

    if (formMode === 'edit') {
      setCaseList((prev) =>
        prev.map((caseItem) => (caseItem.id === savedCase.id ? savedCase : caseItem)),
      );
      showToast({
        title: 'پرونده به‌روزرسانی شد',
        text: 'جزئیات پرونده با موفقیت اصلاح شد.',
        tone: 'success',
      });
    }

    setSelectedCaseId(savedCase.id);
    setCaseFormItem(null);
    setFormMode(null);
    setCurrentPage(1);
  };

  const handleCancelForm = () => {
    setCaseFormItem(null);
    setFormMode(null);
  };

  const handleResetCases = () => {
    setCaseList(initialCases);
    setSelectedCaseId(initialCases[0]?.id || '');
    setCaseFormItem(null);
    setFormMode(null);
    setFilters(initialFilters);
    setCurrentPage(1);

    showToast({
      title: 'داده‌ها بازنشانی شد',
      text: 'پرونده‌های نمونه دوباره در مرورگر ذخیره شدند.',
      tone: 'info',
    });
  };

  return (
    <div
      className="min-h-screen bg-[#020b1c] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_28%)] text-slate-100"
      dir="ltr"
    >
      <Header
        totalCases={caseList.length}
        onAddCase={handleAddCase}
        onResetCases={handleResetCases}
      />

      <main className="mx-auto flex max-w-[1480px] flex-col gap-4 px-5 py-4">
        <SummaryCard summarys={summaryItems} />

        <section className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_470px]">
          <Filters
            filters={filters}
            onChange={(nextFilters) => {
              setFilters(nextFilters);
              setCurrentPage(1);
            }}
            onReset={() => {
              setFilters(initialFilters);
              setCurrentPage(1);
            }}
          />

          <div
            className="min-w-0 rounded-md border border-slate-700/80 bg-slate-900/60 p-4 shadow-[0_18px_70px_rgba(15,23,42,0.22)]"
            dir="rtl"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-white">لیست پرونده‌ها</h2>
                <p className="mt-1 text-sm text-slate-400">
                  نمایش {firstVisibleCase}-{Math.min(firstCaseIndex + pageSize, visibleCases.length)} از{' '}
                  {visibleCases.length} پرونده
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="grid h-10 w-12 place-items-center rounded-md border border-blue-500/60 bg-blue-500/10 text-blue-300"
                  type="button"
                >
                  ☰
                </button>
                <button
                  className="grid h-10 w-12 place-items-center rounded-md border border-slate-700 bg-slate-950/40 text-slate-300"
                  type="button"
                >
                  ≡
                </button>
              </div>
            </div>

            <CaseList
              editingCaseId={editingCaseId}
              selectedCaseId={selectedCaseId}
              onEdit={handleEdit}
              onView={setSelectedCaseId}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              cases={pageCases}
            />

            <div
              className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-400"
              dir="ltr"
            >
              <button
                className="grid h-9 w-9 place-items-center rounded-md border border-slate-700 text-slate-300 transition hover:border-blue-400 hover:text-blue-300"
                type="button"
                onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
              >
                ‹
              </button>
              {Array.from({ length: Math.min(pageCount, 3) }).map((_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    className={`grid h-9 w-9 place-items-center rounded-md transition ${
                      activePage === pageNumber
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/40'
                        : 'border border-slate-700 text-slate-300 hover:border-blue-400'
                    }`}
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {pageCount > 3 ? <span className="px-3">...</span> : null}
              {pageCount > 3 ? (
                <button
                  className="grid h-9 w-9 place-items-center rounded-md border border-slate-700 text-slate-300 transition hover:border-blue-400"
                  type="button"
                  onClick={() => setCurrentPage(pageCount)}
                >
                  {pageCount}
                </button>
              ) : null}
              <button
                className="grid h-9 w-9 place-items-center rounded-md border border-slate-700 text-slate-300 transition hover:border-blue-400 hover:text-blue-300"
                type="button"
                onClick={() => setCurrentPage(Math.min(pageCount, activePage + 1))}
              >
                ›
              </button>
            </div>
          </div>

          {formMode ? (
            <CaseForm
              caseItem={caseFormItem}
              key={`${formMode}-${caseFormItem?.id || 'empty'}`}
              mode={formMode}
              onCancel={handleCancelForm}
              onSave={handleSaveCase}
            />
          ) : (
            <CaseDetail
              caseItem={selectedCase}
              onClose={() => setSelectedCaseId('')}
              onEdit={handleEdit}
            />
          )}
        </section>
      </main>

      <Toast message={toast} />
    </div>
  );
};

export default Dashboard;
