import type { CaseType } from '../types';

const STORAGE_KEY = 'simorgh-control-desk-cases-v2';

export function loadCases(fallbackCases: CaseType[]) {
  const savedCases = localStorage.getItem(STORAGE_KEY);

  if (!savedCases) {
    return fallbackCases;
  }

  try {
    const parsedCases = JSON.parse(savedCases);

    if (Array.isArray(parsedCases)) {
      return parsedCases as CaseType[];
    }

    return fallbackCases;
  } catch {
    return fallbackCases;
  }
}

export function saveCases(cases: CaseType[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}
