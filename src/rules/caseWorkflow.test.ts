import { describe, expect, it } from 'vitest';
import {
  canChangeCaseStatus,
  getAvailableCaseStatuses,
} from './caseWorkflow';

describe('case status workflow', () => {
  it('moves an open case into active follow-up', () => {
    expect(canChangeCaseStatus('open', 'in_progress')).toBe(true);
    expect(getAvailableCaseStatuses('open')).toEqual(['open', 'in_progress']);
  });

  it('allows an active case to return or move forward', () => {
    expect(getAvailableCaseStatuses('in_progress')).toEqual([
      'in_progress',
      'open',
      'resolved',
    ]);
  });

  it('requires a resolved case before closing it', () => {
    expect(canChangeCaseStatus('open', 'closed')).toBe(false);
    expect(canChangeCaseStatus('in_progress', 'closed')).toBe(false);
    expect(canChangeCaseStatus('resolved', 'closed')).toBe(true);
  });

  it('keeps a closed case final', () => {
    expect(getAvailableCaseStatuses('closed')).toEqual(['closed']);
    expect(canChangeCaseStatus('closed', 'in_progress')).toBe(false);
  });
});
