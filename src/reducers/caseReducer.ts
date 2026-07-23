import type { CaseType, Status } from '../types';
import { canChangeCaseStatus } from '../rules/caseWorkflow';

export type CaseAction =
  | { type: 'ADD_CASE'; caseItem: CaseType }
  | { type: 'UPDATE_CASE'; caseItem: CaseType }
  | { type: 'DELETE_CASE'; id: string }
  | { type: 'CHANGE_STATUS'; id: string; status: Status; updatedAt: string }
  | { type: 'RESET_CASES'; cases: CaseType[] };

export function caseReducer(cases: CaseType[], action: CaseAction): CaseType[] {
  switch (action.type) {
    case 'ADD_CASE':
      if (
        action.caseItem.status !== 'open' ||
        cases.some((caseItem) => caseItem.id === action.caseItem.id)
      ) {
        return cases;
      }

      return [action.caseItem, ...cases];

    case 'UPDATE_CASE': {
      const currentCase = cases.find(
        (caseItem) => caseItem.id === action.caseItem.id,
      );

      if (
        !currentCase ||
        !canChangeCaseStatus(currentCase.status, action.caseItem.status)
      ) {
        return cases;
      }

      return cases.map((caseItem) =>
        caseItem.id === action.caseItem.id ? action.caseItem : caseItem,
      );
    }

    case 'DELETE_CASE':
      return cases.filter((caseItem) => caseItem.id !== action.id);

    case 'CHANGE_STATUS':
      if (
        !cases.some(
          (caseItem) =>
            caseItem.id === action.id &&
            canChangeCaseStatus(caseItem.status, action.status),
        )
      ) {
        return cases;
      }

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
