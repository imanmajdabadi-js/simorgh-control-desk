type CaseTag = 'vip' | 'airport' | 'delay';

export interface CaseTagList {
  tags: CaseTag[];
}

export interface Case {
  id: 1;
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
  tags: CaseTagList;
  isEscalated: boolean;
}

export interface CaseCardShow {
  id: string;
  title: string;
  customerName: string;
  status: Status;
  city: City;
  estimatedLoss: number;
  priority: Priority;
}

type Category = 'travel' | 'payment' | 'delivery' | 'refund' | 'support';

type Priority = 'high' | 'critical' | 'medium' | 'low';

type City = 'Tehran' | 'Shiraz' | 'Mashhad' | 'Tabriz' | 'Isfahan' | 'Rasht' | 'Yazd';

type Status = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface SummaryType {
  title: string;
  number: number;
  id: string;
}
