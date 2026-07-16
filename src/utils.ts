import type {
  CaseFilters,
  CaseSort,
  CaseType,
  Category,
  City,
  Priority,
  Status,
} from './types';

export const statusOptions: Status[] = ['open', 'in_progress', 'resolved', 'closed'];
export const priorityOptions: Priority[] = ['critical', 'high', 'medium', 'low'];
export const cityOptions: City[] = [
  'Tehran',
  'Shiraz',
  'Mashhad',
  'Tabriz',
  'Isfahan',
  'Rasht',
  'Yazd',
];
export const categoryOptions: Category[] = [
  'travel',
  'payment',
  'delivery',
  'refund',
  'support',
];

export const sortOptions: { label: string; value: CaseSort }[] = [
  { label: 'جدیدترین اول', value: 'newest' },
  { label: 'قدیمی‌ترین اول', value: 'oldest' },
  { label: 'اولویت بحرانی اول', value: 'priority_high' },
  { label: 'اولویت کم اول', value: 'priority_low' },
  { label: 'ضرر بیشتر اول', value: 'highest_loss' },
  { label: 'ضرر کمتر اول', value: 'lowest_loss' },
];

export const statusLabels: Record<Status, string> = {
  open: 'باز',
  in_progress: 'در حال پیگیری',
  resolved: 'حل‌شده',
  closed: 'بسته',
};

export const priorityLabels: Record<Priority, string> = {
  critical: 'بحرانی',
  high: 'زیاد',
  medium: 'متوسط',
  low: 'کم',
};

export const cityLabels: Record<City, string> = {
  Isfahan: 'اصفهان',
  Mashhad: 'مشهد',
  Rasht: 'رشت',
  Shiraz: 'شیراز',
  Tabriz: 'تبریز',
  Tehran: 'تهران',
  Yazd: 'یزد',
};

export const categoryLabels: Record<Category, string> = {
  travel: 'سفر',
  payment: 'پرداخت',
  delivery: 'تحویل',
  refund: 'بازپرداخت',
  support: 'پشتیبانی',
};

export function getTagsByCategory(category: Category): CaseType['tags'] {
  const tagsByCategory: Record<Category, CaseType['tags']> = {
    travel: ['flight', 'booking'],
    payment: ['payment', 'order'],
    delivery: ['delivery', 'address'],
    refund: ['refund'],
    support: ['support'],
  };

  return tagsByCategory[category];
}

export function formatMoney(value: number) {
  const formattedValue = new Intl.NumberFormat('fa-IR', {
    maximumFractionDigits: 0,
  }).format(value);

  return `${formattedValue} تومان`;
}

export function filterCases(cases: CaseType[], filters: CaseFilters) {
  const searchText = filters.search.trim().toLowerCase();
  const priorityWeight: Record<Priority, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };

  const filteredCases = cases.filter((caseItem) => {
    const matchStatus = filters.status === 'all' || caseItem.status === filters.status;
    const matchPriority =
      filters.priority === 'all' || caseItem.priority === filters.priority;
    const matchCity = filters.city === 'all' || caseItem.city === filters.city;
    const matchSearch =
      !searchText ||
      `${caseItem.title} ${caseItem.customerName} ${caseItem.city} ${caseItem.category} ${caseItem.tags.join(' ')}`
        .toLowerCase()
        .includes(searchText);

    return matchStatus && matchPriority && matchCity && matchSearch;
  });

  return [...filteredCases].sort((firstCase, secondCase) => {
    if (filters.sort === 'priority_high') {
      return priorityWeight[secondCase.priority] - priorityWeight[firstCase.priority];
    }

    if (filters.sort === 'priority_low') {
      return priorityWeight[firstCase.priority] - priorityWeight[secondCase.priority];
    }

    if (filters.sort === 'highest_loss') {
      return secondCase.estimatedLoss - firstCase.estimatedLoss;
    }

    if (filters.sort === 'lowest_loss') {
      return firstCase.estimatedLoss - secondCase.estimatedLoss;
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
      criticalCases: 0,
      highPriorityCases: 0,
      escalatedCases: 0,
      unassignedCases: 0,
      totalLoss: 0,
      averageLoss: 0,
      newThisWeek: 0,
    };
  }

  const openCases = cases.filter((caseItem) => caseItem.status === 'open').length;
  const criticalCases = cases.filter((caseItem) => caseItem.priority === 'critical').length;
  const highPriorityCases = cases.filter(
    (caseItem) => caseItem.priority === 'high' || caseItem.priority === 'critical',
  ).length;
  const escalatedCases = cases.filter((caseItem) => caseItem.isEscalated).length;
  const unassignedCases = cases.filter((caseItem) => !caseItem.assignedTo.trim()).length;
  const newestCaseTime = Math.max(
    ...cases.map((caseItem) => new Date(caseItem.createdAt).getTime()),
  );
  const newThisWeek = cases.filter((caseItem) => {
    const createdAt = new Date(caseItem.createdAt).getTime();
    const weekInMs = 7 * 24 * 60 * 60 * 1000;

    return newestCaseTime - createdAt < weekInMs;
  }).length;
  const totalLoss = cases.reduce((sum, caseItem) => sum + caseItem.estimatedLoss, 0);
  const averageLoss = totalLoss / cases.length;

  return {
    totalCases: cases.length,
    openCases,
    criticalCases,
    highPriorityCases,
    escalatedCases,
    unassignedCases,
    totalLoss,
    averageLoss,
    newThisWeek,
  };
}
