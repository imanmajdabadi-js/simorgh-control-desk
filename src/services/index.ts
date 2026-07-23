import type { CaseType } from '../types';
import { isStoredCaseList } from '../rules/caseValidation';

const STORAGE_KEY = 'simorgh-control-desk-cases-v3';

export function loadCases(fallbackCases: CaseType[]) {
  try {
    const savedCases = localStorage.getItem(STORAGE_KEY);

    if (!savedCases) {
      return [...fallbackCases];
    }

    const parsedCases: unknown = JSON.parse(savedCases);

    return isStoredCaseList(parsedCases) ? parsedCases : [...fallbackCases];
  } catch {
    return [...fallbackCases];
  }
}

export function saveCases(cases: CaseType[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    return true;
  } catch {
    return false;
  }
}
