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
  const [selectedCaseId, setSelectedCaseId] = useState(
    () => loadCases(initialCases)[0]?.id || '',
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const visibleCases = useMemo(() => filterCases(caseList, filters), [caseList, filters]);
  const stats = useMemo(() => getCaseStats(caseList), [caseList]);
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
    },
    {
      id: 'open',
      title: 'پرونده‌های باز',
      value: stats.openCases.toString(),
      caption: 'مواردی که هنوز نیاز به اقدام دارند',
      accent: 'green',
    },
    {
      id: 'priority',
      title: 'بحرانی',
      value: stats.criticalCases.toString(),
      caption: 'مواردی که باید زودتر دیده شوند',
      accent: 'rose',
    },
    {
      id: 'escalated',
      title: 'ارجاع‌شده',
      value: stats.escalatedCases.toString(),
      caption: 'پرونده‌های نیازمند توجه مدیر',
      accent: 'violet',
    },
    {
      id: 'unassigned',
      title: 'بدون مسئول',
      value: stats.unassignedCases.toString(),
      caption: 'مواردی که هنوز مالک ندارند',
      accent: 'orange',
    },
    {
      id: 'loss',
      title: 'ضرر احتمالی',
      value: formatMoney(stats.totalLoss),
      caption: 'جمع اثر مالی پرونده‌ها',
      accent: 'blue',
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

    showToast({
      title: 'داده‌ها بازنشانی شد',
      text: 'پرونده‌های نمونه دوباره در مرورگر ذخیره شدند.',
      tone: 'info',
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(135deg,#f8fafc,#eef2ff_48%,#f8fafc)] text-slate-900">
      <Header
        totalCases={caseList.length}
        onAddCase={handleAddCase}
        onResetCases={handleResetCases}
      />

      <main className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6">
        <SummaryCard summarys={summaryItems} />

        <section className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_340px]">
          <Filters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
          />

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-slate-950">لیست پرونده‌ها</h2>
                <p className="mt-1 text-sm text-slate-500">
                  نمایش {visibleCases.length} مورد از {caseList.length} پرونده
                </p>
              </div>
            </div>

            <CaseList
              editingCaseId={editingCaseId}
              selectedCaseId={selectedCaseId}
              onEdit={handleEdit}
              onView={setSelectedCaseId}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              cases={visibleCases}
            />
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
            <CaseDetail caseItem={selectedCase} onEdit={handleEdit} />
          )}
        </section>
      </main>

      <Toast message={toast} />
    </div>
  );
};

export default Dashboard;
