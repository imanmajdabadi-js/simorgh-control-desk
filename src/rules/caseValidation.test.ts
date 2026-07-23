import { describe, expect, it } from 'vitest';
import { initialCases } from '../data/data';
import {
  getNextCaseTags,
  isStoredCase,
  isStoredCaseList,
  validateCaseForm,
  type CaseFormValues,
} from './caseValidation';

const validValues: CaseFormValues = {
  assignedTo: 'سارا احمدی',
  category: 'support',
  city: 'Tehran',
  customerName: 'علی رضایی',
  description: 'پیگیری اختلال ثبت‌شده برای سرویس مشتری',
  estimatedLoss: '۱۲۵۰۰۰',
  isEscalated: false,
  priority: 'medium',
  status: 'open',
  title: 'اختلال در سرویس',
};

describe('case form rules', () => {
  it('accepts a complete form', () => {
    expect(validateCaseForm(validValues)).toEqual({});
  });

  it('returns field errors for incomplete values', () => {
    expect(
      validateCaseForm({
        ...validValues,
        customerName: 'ا',
        description: 'کوتاه',
        estimatedLoss: '-1',
        title: '',
      }),
    ).toMatchObject({
      customerName: expect.any(String),
      description: expect.any(String),
      estimatedLoss: expect.any(String),
      title: expect.any(String),
    });
  });

  it('keeps custom tags when the category has not changed', () => {
    const currentCase = initialCases[0];

    expect(getNextCaseTags(currentCase, currentCase.category)).toEqual(
      currentCase.tags,
    );
  });

  it('uses category tags after a category change', () => {
    expect(getNextCaseTags(initialCases[0], 'refund')).toEqual(['refund']);
  });
});

describe('stored case validation', () => {
  it('accepts the complete sample data', () => {
    expect(isStoredCaseList(initialCases)).toBe(true);
  });

  it('rejects incomplete or malformed stored data', () => {
    expect(isStoredCase({ ...initialCases[0], createdAt: 'not-a-date' })).toBe(
      false,
    );
    expect(isStoredCase({ ...initialCases[0], title: '' })).toBe(false);
    expect(isStoredCaseList([{ id: '1' }])).toBe(false);
  });
});
