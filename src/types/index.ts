export interface CaseType {
  id: string;
  title: string;
  customerName: string;
  category: Category;
  city: City;
  priority: Priority;
  status: Status;
  assignedTo: string;
  estimatedLoss: number;
  createdAt: string | Date;
  lastUpdatedAt: string | Date;
  description: string;
  tags: CaseTag[];
  isEscalated: boolean;
}

type CaseTag =
  | 'vip'
  | 'airport'
  | 'delay'
  | 'address'
  | 'delivery'
  | 'flight'
  | 'pricing'
  | 'refund'
  | 'urgent'
  | 'partner'
  | 'cancelled'
  | 'booking'
  | 'duplicate'
  | 'system'
  | 'support'
  | 'approval'
  | 'payment'
  | 'order'
  | 'bug';

export type Category = 'travel' | 'payment' | 'delivery' | 'refund' | 'support';

export type Priority = 'high' | 'critical' | 'medium' | 'low';

export type City = 'Tehran' | 'Shiraz' | 'Mashhad' | 'Tabriz' | 'Isfahan' | 'Rasht' | 'Yazd';

export type Status = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface SummaryType {
  accent: 'blue' | 'green' | 'orange' | 'rose' | 'violet';
  caption: string;
  icon: string;
  title: string;
  value: string;
  id: string;
}

export type FilterValue = 'all';

export type CaseSort =
  | 'newest'
  | 'oldest'
  | 'priority_high'
  | 'priority_low'
  | 'highest_loss'
  | 'lowest_loss';

export interface CaseFilters {
  status: Status | FilterValue;
  priority: Priority | FilterValue;
  city: City | FilterValue;
  search: string;
  sort: CaseSort;
}
