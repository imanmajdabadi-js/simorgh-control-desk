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
  'booking',
  'payment',
  'transfer',
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
  booking: 'رزرو',
  payment: 'پرداخت',
  transfer: 'انتقال فرودگاهی',
  refund: 'بازپرداخت',
  support: 'پشتیبانی',
};

export function getTagsByCategory(category: Category): CaseType['tags'] {
  const tagsByCategory: Record<Category, CaseType['tags']> = {
    booking: ['flight', 'booking'],
    payment: ['payment', 'order'],
    transfer: ['airport', 'address'],
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

export function normalizeNumberInput(value: string) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

  return value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
    .replace(/[,\u066c\s]/g, '');
}

export function normalizeSearchText(value: string) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

  return value
    .trim()
    .toLowerCase()
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک');
}

export function createDraftCase(cases: CaseType[]): CaseType {
  const numericIds = cases
    .map((caseItem) => Number(caseItem.id))
    .filter((id) => Number.isFinite(id));
  const lastId = Math.max(0, ...numericIds);
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
}

export function filterCases(cases: CaseType[], filters: CaseFilters) {
  const searchText = normalizeSearchText(filters.search);
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
    const caseCode = `SC-${1040 + Number(caseItem.id)}`;
    const searchableText = normalizeSearchText(
      [
        caseCode,
        caseItem.title,
        caseItem.customerName,
        caseItem.assignedTo,
        caseItem.description,
        cityLabels[caseItem.city],
        categoryLabels[caseItem.category],
        statusLabels[caseItem.status],
        priorityLabels[caseItem.priority],
        caseItem.tags.join(' '),
      ].join(' '),
    );
    const matchSearch = !searchText || searchableText.includes(searchText);

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
      escalatedCases: 0,
      unassignedCases: 0,
      totalLoss: 0,
    };
  }

  const activeCases = cases.filter(
    (caseItem) => caseItem.status === 'open' || caseItem.status === 'in_progress',
  );
  const criticalCases = activeCases.filter(
    (caseItem) => caseItem.priority === 'critical',
  ).length;
  const escalatedCases = activeCases.filter(
    (caseItem) => caseItem.isEscalated,
  ).length;
  const unassignedCases = activeCases.filter(
    (caseItem) => !caseItem.assignedTo.trim(),
  ).length;
  const totalLoss = activeCases.reduce(
    (sum, caseItem) => sum + caseItem.estimatedLoss,
    0,
  );

  return {
    totalCases: cases.length,
    openCases: activeCases.length,
    criticalCases,
    escalatedCases,
    unassignedCases,
    totalLoss,
  };
}
