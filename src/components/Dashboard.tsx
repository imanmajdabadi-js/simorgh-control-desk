import {
  AlertTriangle,
  CircleDollarSign,
  ClipboardList,
  FolderClock,
} from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { toast } from 'sonner';
import { initialCases } from '../data/data';
import { caseReducer } from '../reducers/caseReducer';
import { canChangeCaseStatus } from '../rules/caseWorkflow';
import { loadCases, saveCases } from '../services';
import type { CaseFilters, CaseType, Status } from '../types';
import { createDraftCase, filterCases, formatMoney, getCaseStats } from '../utils';
import CaseDetail from './CaseDetail';
import CaseForm from './CaseForm';
import CaseList from './CaseList';
import ConfirmDialog from './ConfirmDialog';
import Filters from './Filters';
import Header from './Header';
import OperationsBrief from './OperationsBrief';
import Pagination from './Pagination';
import SummaryCard, { type SummaryItem } from './SummaryCard';

const initialFilters: CaseFilters = {
  status: 'all',
  priority: 'all',
  city: 'all',
  search: '',
  sort: 'newest',
};

type FormMode = 'add' | 'edit' | null;

type Confirmation =
  | { type: 'delete'; caseItem: CaseType }
  | { type: 'reset' }
  | null;

const PAGE_SIZE = 5;

const Dashboard = () => {
  const [caseList, dispatch] = useReducer(caseReducer, initialCases, loadCases);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [caseFormItem, setCaseFormItem] = useState<CaseType | null>(null);
  const [filters, setFilters] = useState<CaseFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCaseId, setSelectedCaseId] = useState(() => caseList[0]?.id || '');
  const [confirmation, setConfirmation] = useState<Confirmation>(null);

  const visibleCases = filterCases(caseList, filters);
  const stats = getCaseStats(caseList);
  const pageCount = Math.max(1, Math.ceil(visibleCases.length / PAGE_SIZE));
  const activePage = Math.min(currentPage, pageCount);
  const firstCaseIndex = (activePage - 1) * PAGE_SIZE;
  const firstVisibleCase = visibleCases.length === 0 ? 0 : firstCaseIndex + 1;
  const lastVisibleCase = Math.min(
    firstCaseIndex + PAGE_SIZE,
    visibleCases.length,
  );
  const pageCases = visibleCases.slice(firstCaseIndex, firstCaseIndex + PAGE_SIZE);
  const selectedCase =
    caseList.find((caseItem) => caseItem.id === selectedCaseId) || null;
  const editingCaseId = formMode === 'edit' ? caseFormItem?.id || null : null;

  useEffect(() => {
    saveCases(caseList);
  }, [caseList]);

  const summaryItems: SummaryItem[] = [
    {
      id: 'total',
      title: 'کل پرونده‌ها',
      value: stats.totalCases.toString(),
      caption: 'همه موارد ثبت‌شده',
      accent: 'blue',
      icon: ClipboardList,
    },
    {
      id: 'open',
      title: 'نیازمند پیگیری',
      value: stats.openCases.toString(),
      caption: 'پرونده‌های باز',
      accent: 'green',
      icon: FolderClock,
    },
    {
      id: 'priority',
      title: 'اولویت بحرانی',
      value: stats.criticalCases.toString(),
      caption: 'نیازمند اقدام فوری',
      accent: 'rose',
      icon: AlertTriangle,
    },
    {
      id: 'loss',
      title: 'ریسک مالی',
      value: formatMoney(stats.totalLoss),
      caption: 'جمع ریسک پرونده‌های فعال',
      accent: 'gold',
      icon: CircleDollarSign,
    },
  ];

  const handleAddCase = () => {
    setFormMode('add');
    setCaseFormItem(createDraftCase(caseList));
    setSelectedCaseId('');
    setCurrentPage(1);
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

  const handleRequestDelete = (id: string) => {
    const caseToDelete = caseList.find((caseItem) => caseItem.id === id);

    if (caseToDelete) {
      setConfirmation({ type: 'delete', caseItem: caseToDelete });
    }
  };

  const handleConfirmAction = () => {
    if (confirmation?.type === 'delete') {
      const deletedCase = confirmation.caseItem;
      const nextCases = caseList.filter((caseItem) => caseItem.id !== deletedCase.id);

      dispatch({ type: 'DELETE_CASE', id: deletedCase.id });

      if (selectedCaseId === deletedCase.id) {
        setSelectedCaseId(nextCases[0]?.id || '');
      }

      if (caseFormItem?.id === deletedCase.id) {
        setCaseFormItem(null);
        setFormMode(null);
      }

      toast.success('پرونده حذف شد', {
        description: `پرونده «${deletedCase.title}» از میز عملیات حذف شد.`,
      });
    }

    if (confirmation?.type === 'reset') {
      dispatch({ type: 'RESET_CASES', cases: initialCases });
      setSelectedCaseId(initialCases[0]?.id || '');
      setCaseFormItem(null);
      setFormMode(null);
      setFilters(initialFilters);
      setCurrentPage(1);

      toast.info('داده‌های نمونه بازگردانده شدند', {
        description: 'همه تغییرات محلی پاک شدند.',
      });
    }

    setConfirmation(null);
  };

  const handleStatusChange = (id: string, status: Status) => {
    const currentCase = caseList.find((caseItem) => caseItem.id === id);

    if (!currentCase || currentCase.status === status) {
      return;
    }

    if (!canChangeCaseStatus(currentCase.status, status)) {
      toast.error('این تغییر وضعیت مجاز نیست', {
        description: 'پرونده باید مرحله‌های چرخه پیگیری را به‌ترتیب طی کند.',
      });
      return;
    }

    const updatedAt = new Date().toISOString();

    dispatch({
      type: 'CHANGE_STATUS',
      id,
      status,
      updatedAt,
    });

    setCaseFormItem((currentItem) =>
      currentItem?.id === id
        ? { ...currentItem, status, lastUpdatedAt: updatedAt }
        : currentItem,
    );

    toast.info('وضعیت پرونده تغییر کرد', {
      description: 'تغییر جدید در مرورگر ذخیره شد.',
    });
  };

  const handleSaveCase = (savedCase: CaseType) => {
    if (formMode === 'add') {
      dispatch({ type: 'ADD_CASE', caseItem: savedCase });
      toast.success('پرونده جدید ثبت شد', {
        description: 'پرونده به ابتدای صف پیگیری اضافه شد.',
      });
    }

    if (formMode === 'edit') {
      dispatch({ type: 'UPDATE_CASE', caseItem: savedCase });
      toast.success('تغییرات ذخیره شد', {
        description: 'اطلاعات پرونده با موفقیت به‌روزرسانی شد.',
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

  const handleFilterChange = (nextFilters: CaseFilters) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handleShowCriticalCases = () => {
    setFilters({
      ...initialFilters,
      priority: 'critical',
    });
    setCurrentPage(1);
    setSelectedCaseId('');
  };

  const isDeleteConfirmation = confirmation?.type === 'delete';

  return (
    <div className="min-h-screen text-ink" dir="rtl">
      <Header
        onAddCase={handleAddCase}
        onResetCases={() => setConfirmation({ type: 'reset' })}
        totalCases={caseList.length}
      />

      <main className="mx-auto flex max-w-control flex-col gap-5 px-4 py-5 sm:px-6 sm:py-7">
        <OperationsBrief
          criticalCases={stats.criticalCases}
          escalatedCases={stats.escalatedCases}
          onShowCritical={handleShowCriticalCases}
          unassignedCases={stats.unassignedCases}
        />

        <SummaryCard summaries={summaryItems} />

        <Filters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <section className="workspace-grid">
          <section className="min-w-0 rounded-panel border border-stroke bg-surface p-4 shadow-panel sm:p-6">
            <header className="mb-5 flex flex-col gap-3 border-b border-stroke-soft pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-brand">صف پیگیری عملیات</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-ink">
                  پرونده‌های خدمات سفر
                </h2>
              </div>
              <p className="text-sm leading-6 text-muted">
                نمایش {firstVisibleCase} تا {lastVisibleCase} از {visibleCases.length}{' '}
                پرونده
              </p>
            </header>

            <CaseList
              cases={pageCases}
              editingCaseId={editingCaseId}
              onDelete={handleRequestDelete}
              onEdit={handleEdit}
              onStatusChange={handleStatusChange}
              onView={setSelectedCaseId}
              selectedCaseId={selectedCaseId}
            />

            <Pagination
              currentPage={activePage}
              onChange={setCurrentPage}
              pageCount={pageCount}
            />
          </section>

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

      <ConfirmDialog
        confirmLabel={isDeleteConfirmation ? 'حذف پرونده' : 'بازنشانی داده‌ها'}
        description={
          isDeleteConfirmation
            ? `پرونده «${confirmation.caseItem.title}» برای همیشه از داده‌های محلی حذف می‌شود.`
            : 'همه تغییرات محلی پاک می‌شوند و پرونده‌های نمونه اولیه دوباره برمی‌گردند.'
        }
        isOpen={confirmation !== null}
        onCancel={() => setConfirmation(null)}
        onConfirm={handleConfirmAction}
        title={isDeleteConfirmation ? 'حذف این پرونده؟' : 'بازنشانی داده‌ها؟'}
        tone={isDeleteConfirmation ? 'danger' : 'warning'}
      />
    </div>
  );
};

export default Dashboard;
