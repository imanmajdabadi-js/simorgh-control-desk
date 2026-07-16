import type { CaseFilters, CaseType, City, Priority, Status } from './types';

export const statusLabels: Record<Status, string> = {
  open: 'Open',
  in_progress: 'In progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const priorityLabels: Record<Priority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const cityLabels: Record<City, string> = {
  Isfahan: 'Isfahan',
  Mashhad: 'Mashhad',
  Rasht: 'Rasht',
  Shiraz: 'Shiraz',
  Tabriz: 'Tabriz',
  Tehran: 'Tehran',
  Yazd: 'Yazd',
};

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function filterCases(cases: CaseType[], filters: CaseFilters) {
  const searchText = filters.search.trim().toLowerCase();

  const filteredCases = cases.filter((caseItem) => {
    const matchStatus = filters.status === 'all' || caseItem.status === filters.status;
    const matchPriority =
      filters.priority === 'all' || caseItem.priority === filters.priority;
    const matchCity = filters.city === 'all' || caseItem.city === filters.city;
    const matchSearch =
      !searchText ||
      `${caseItem.title} ${caseItem.customerName} ${caseItem.city}`
        .toLowerCase()
        .includes(searchText);

    return matchStatus && matchPriority && matchCity && matchSearch;
  });

  return [...filteredCases].sort((firstCase, secondCase) => {
    if (filters.sort === 'highest_loss') {
      return secondCase.estimatedLoss - firstCase.estimatedLoss;
    }

    const firstTime = new Date(firstCase.createdAt).getTime();
    const secondTime = new Date(secondCase.createdAt).getTime();

    if (filters.sort === 'oldest') {
      return firstTime - secondTime;
    }

    return secondTime - firstTime;
  });
}

export function getCaseStats(cases: CaseType[]) {
  if (cases.length === 0) {
    return {
      totalCases: 0,
      openCases: 0,
      highPriorityCases: 0,
      totalLoss: 0,
      newThisWeek: 0,
    };
  }

  const openCases = cases.filter((caseItem) => caseItem.status === 'open').length;
  const highPriorityCases = cases.filter(
    (caseItem) => caseItem.priority === 'high' || caseItem.priority === 'critical',
  ).length;
  const newestCaseTime = Math.max(
    ...cases.map((caseItem) => new Date(caseItem.createdAt).getTime()),
  );
  const newThisWeek = cases.filter((caseItem) => {
    const createdAt = new Date(caseItem.createdAt).getTime();
    const weekInMs = 7 * 24 * 60 * 60 * 1000;

    return newestCaseTime - createdAt < weekInMs;
  }).length;
  const totalLoss = cases.reduce((sum, caseItem) => sum + caseItem.estimatedLoss, 0);

  return {
    totalCases: cases.length,
    openCases,
    highPriorityCases,
    totalLoss,
    newThisWeek,
  };
}
