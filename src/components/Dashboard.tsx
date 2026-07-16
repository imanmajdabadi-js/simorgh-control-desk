import { useMemo, useState } from 'react';
import { initialCases } from '../data/data';
import type { CaseFilters, CaseType, SummaryType } from '../types';
import { filterCases, formatMoney, getCaseStats } from '../utils';
import CaseDetail from './CaseDetail';
import CaseList from './CaseList';
import Filters from './Filters';
import Header from './Header';
import SummaryCard from './SummaryCard';

const initialFilters: CaseFilters = {
  status: 'all',
  priority: 'all',
  city: 'all',
  search: '',
  sort: 'newest',
};

const Dashboard = () => {
  const [caseList, setCaseList] = useState<CaseType[]>(initialCases);
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [filters, setFilters] = useState<CaseFilters>(initialFilters);
  const [selectedCaseId, setSelectedCaseId] = useState(initialCases[0]?.id || '');

  const visibleCases = useMemo(() => filterCases(caseList, filters), [caseList, filters]);
  const stats = useMemo(() => getCaseStats(caseList), [caseList]);
  const selectedCase = caseList.find((caseItem) => caseItem.id === selectedCaseId) || null;

  const summaryItems: SummaryType[] = [
    {
      id: 'total',
      title: 'Total Cases',
      value: stats.totalCases.toString(),
      caption: 'All registered customer cases',
      accent: 'blue',
    },
    {
      id: 'open',
      title: 'Open Cases',
      value: stats.openCases.toString(),
      caption: 'Cases still waiting for action',
      accent: 'green',
    },
    {
      id: 'priority',
      title: 'High Priority',
      value: stats.highPriorityCases.toString(),
      caption: 'High and critical cases',
      accent: 'rose',
    },
    {
      id: 'loss',
      title: 'Estimated Loss',
      value: formatMoney(stats.totalLoss),
      caption: 'Total possible business impact',
      accent: 'orange',
    },
    {
      id: 'week',
      title: 'New This Week',
      value: stats.newThisWeek.toString(),
      caption: 'Recent cases in the current data',
      accent: 'violet',
    },
  ];

  const handleDelete = (id: string) => {
    setCaseList((prev) => prev.filter((item) => item.id !== id));

    if (selectedCaseId === id) {
      const nextCase = caseList.find((caseItem) => caseItem.id !== id);
      setSelectedCaseId(nextCase?.id || '');
    }
  };

  const handleEdit = (id: string) => {
    setEditingCaseId(id);
    setSelectedCaseId(id);
  };

  const handleAddCase = () => {
    const lastId = Math.max(0, ...caseList.map((caseItem) => Number(caseItem.id)));
    const nextId = String(lastId + 1);
    const newCase: CaseType = {
      id: nextId,
      title: 'New customer case',
      customerName: 'New Customer',
      category: 'support',
      city: 'Tehran',
      priority: 'medium',
      status: 'open',
      assignedTo: '',
      estimatedLoss: 0,
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      description: 'This draft case is ready to be edited in the next step.',
      tags: ['support'],
      isEscalated: false,
    };

    setCaseList((prev) => [newCase, ...prev]);
    setSelectedCaseId(nextId);
    setEditingCaseId(nextId);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(135deg,#f8fafc,#eef2ff_48%,#f8fafc)] text-slate-900">
      <Header totalCases={caseList.length} onAddCase={handleAddCase} />

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
                <h2 className="text-2xl font-black text-slate-950">Case List</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Showing {visibleCases.length} of {caseList.length} cases
                </p>
              </div>
            </div>

            <CaseList
              editingCaseId={editingCaseId}
              selectedCaseId={selectedCaseId}
              onEdit={handleEdit}
              onView={setSelectedCaseId}
              onDelete={handleDelete}
              cases={visibleCases}
            />
          </div>

          <CaseDetail caseItem={selectedCase} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
