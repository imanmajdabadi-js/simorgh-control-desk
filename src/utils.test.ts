import { describe, expect, it } from 'vitest';
import { initialCases } from './data/data';
import {
  filterCases,
  formatCaseCode,
  getCaseStats,
  normalizeNumberInput,
  normalizeSearchText,
} from './utils';

describe('case data helpers', () => {
  it('normalizes Persian and Arabic number input', () => {
    expect(normalizeNumberInput('۱۲٬۵۰۰')).toBe('12500');
    expect(normalizeNumberInput('١٢ ٥٠٠')).toBe('12500');
  });

  it('normalizes Arabic keyboard variants for Persian search', () => {
    expect(normalizeSearchText('  كيان  ')).toBe('کیان');
  });

  it('finds a case by a Persian case number', () => {
    const result = filterCases(initialCases, {
      city: 'all',
      priority: 'all',
      search: '۱۰۴۱',
      sort: 'newest',
      status: 'all',
    });

    expect(result.map((caseItem) => caseItem.id)).toEqual(['1']);
  });

  it('formats the public case code in one shared place', () => {
    expect(formatCaseCode('1')).toBe('SC-1041');
  });

  it('calculates operational totals from active cases', () => {
    expect(getCaseStats(initialCases)).toEqual({
      totalCases: 8,
      activeCases: 6,
      criticalCases: 2,
      escalatedCases: 4,
      unassignedCases: 1,
      totalLoss: 32_600_000,
    });
  });
});
