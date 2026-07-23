import { describe, expect, it } from 'vitest';
import { initialCases } from '../data/data';
import { caseReducer } from './caseReducer';

describe('case reducer status changes', () => {
  it('updates a valid status transition and its timestamp', () => {
    const updatedAt = '2026-07-23T18:30:00.000Z';
    const nextCases = caseReducer(initialCases, {
      type: 'CHANGE_STATUS',
      id: '1',
      status: 'in_progress',
      updatedAt,
    });

    expect(nextCases).not.toBe(initialCases);
    expect(nextCases.find((caseItem) => caseItem.id === '1')).toMatchObject({
      status: 'in_progress',
      lastUpdatedAt: updatedAt,
    });
  });

  it('ignores an invalid status transition', () => {
    const nextCases = caseReducer(initialCases, {
      type: 'CHANGE_STATUS',
      id: '1',
      status: 'closed',
      updatedAt: '2026-07-23T18:30:00.000Z',
    });

    expect(nextCases).toBe(initialCases);
  });

  it('ignores a status change for a missing case', () => {
    const nextCases = caseReducer(initialCases, {
      type: 'CHANGE_STATUS',
      id: 'missing-case',
      status: 'in_progress',
      updatedAt: '2026-07-23T18:30:00.000Z',
    });

    expect(nextCases).toBe(initialCases);
  });

  it('blocks an invalid status hidden inside a full case update', () => {
    const currentCase = initialCases[0];
    const nextCases = caseReducer(initialCases, {
      type: 'UPDATE_CASE',
      caseItem: {
        ...currentCase,
        status: 'closed',
      },
    });

    expect(nextCases).toBe(initialCases);
  });

  it('requires every new case to start open', () => {
    const nextCases = caseReducer(initialCases, {
      type: 'ADD_CASE',
      caseItem: {
        ...initialCases[0],
        id: 'new-case',
        status: 'resolved',
      },
    });

    expect(nextCases).toBe(initialCases);
  });
});
