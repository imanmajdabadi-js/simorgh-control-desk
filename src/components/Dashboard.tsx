import { useState } from 'react';
import { initialCases } from '../data/data';
import type { CaseType } from '../types';
import CaseDetail from './CaseDetail';
import CaseList from './CaseList';
import Filters from './Filters';
import Header from './Header';

const Dashboard = () => {
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [caseList, setCaseList] = useState<CaseType[]>(initialCases);

  const handleDelete = (id: string) => {
    setCaseList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string) => {
    setEditingCaseId(id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <aside className="w-60 shrink-0 border-r">
          <Filters />
        </aside>

        <main className="min-w-0 flex-1 flex">
          <CaseList
            editingCaseId={editingCaseId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            cases={caseList}
          />
          <aside className="w-80 shrink-0 border-l">
            <CaseDetail
              caseItem={{
                city: 'Isfahan',
                customer: 'Iman',
                description: 'asdsadad',
                estimatedLoss: 450000,
                priority: 'critical',
                status: 'closed',
                title: 'Weather',
              }}
            />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
