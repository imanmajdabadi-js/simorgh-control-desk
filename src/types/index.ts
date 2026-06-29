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
  title: string;
  number: number;
  id: string;
}
