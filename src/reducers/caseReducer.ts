import type { CaseType, Status } from '../types';

export type CaseAction =
  | { type: 'ADD_CASE'; caseItem: CaseType }
  | { type: 'UPDATE_CASE'; caseItem: CaseType }
  | { type: 'DELETE_CASE'; id: string }
  | { type: 'CHANGE_STATUS'; id: string; status: Status; updatedAt: string }
  | { type: 'RESET_CASES'; cases: CaseType[] };

export function caseReducer(cases: CaseType[], action: CaseAction): CaseType[] {
  switch (action.type) {
    case 'ADD_CASE':
      return [action.caseItem, ...cases];

    case 'UPDATE_CASE':
      return cases.map((caseItem) =>
        caseItem.id === action.caseItem.id ? action.caseItem : caseItem,
      );

    case 'DELETE_CASE':
      return cases.filter((caseItem) => caseItem.id !== action.id);

    case 'CHANGE_STATUS':
      return cases.map((caseItem) =>
        caseItem.id === action.id
          ? {
              ...caseItem,
              status: action.status,
              lastUpdatedAt: action.updatedAt,
            }
          : caseItem,
      );

    case 'RESET_CASES':
      return [...action.cases];

    default:
      return cases;
  }
}
