import type {
  CaseType,
  Category,
  City,
  Priority,
  Status,
} from '../types';
import {
  categoryOptions,
  cityOptions,
  getTagsByCategory,
  normalizeNumberInput,
  priorityOptions,
  statusOptions,
} from '../utils';

export interface CaseFormValues {
  assignedTo: string;
  category: Category;
  city: City;
  customerName: string;
  description: string;
  estimatedLoss: string;
  isEscalated: boolean;
  priority: Priority;
  status: Status;
  title: string;
}

export type CaseFormErrors = Partial<Record<keyof CaseFormValues, string>>;

export function validateCaseForm(values: CaseFormValues) {
  const errors: CaseFormErrors = {};
  const estimatedLoss = Number(normalizeNumberInput(values.estimatedLoss));

  if (!values.title.trim()) {
    errors.title = 'عنوان پرونده الزامی است.';
  } else if (values.title.trim().length < 4) {
    errors.title = 'عنوان باید حداقل ۴ کاراکتر باشد.';
  }

  if (!values.customerName.trim()) {
    errors.customerName = 'نام مشتری الزامی است.';
  } else if (values.customerName.trim().length < 3) {
    errors.customerName = 'نام مشتری خیلی کوتاه است.';
  }

  if (!values.estimatedLoss.trim()) {
    errors.estimatedLoss = 'مبلغ ضرر احتمالی الزامی است.';
  } else if (
    !Number.isSafeInteger(estimatedLoss) ||
    estimatedLoss < 0
  ) {
    errors.estimatedLoss = 'مبلغ باید عدد صحیح معتبر و صفر یا بیشتر باشد.';
  }

  if (!values.description.trim()) {
    errors.description = 'شرح پرونده الزامی است.';
  } else if (values.description.trim().length < 12) {
    errors.description = 'شرح پرونده باید کمی کامل‌تر باشد.';
  }

  return errors;
}

export function getNextCaseTags(
  currentCase: CaseType,
  nextCategory: Category,
) {
  return nextCategory === currentCase.category
    ? [...currentCase.tags]
    : getTagsByCategory(nextCategory);
}

export function isStoredCase(value: unknown): value is CaseType {
  if (!isRecord(value)) {
    return false;
  }

  const {
    assignedTo,
    category,
    city,
    createdAt,
    customerName,
    description,
    estimatedLoss,
    id,
    isEscalated,
    lastUpdatedAt,
    priority,
    status,
    tags,
    title,
  } = value;

  if (
    typeof id !== 'string' ||
    !Number.isSafeInteger(Number(id)) ||
    Number(id) < 1 ||
    typeof title !== 'string' ||
    typeof customerName !== 'string' ||
    typeof assignedTo !== 'string' ||
    typeof description !== 'string' ||
    typeof estimatedLoss !== 'number' ||
    typeof isEscalated !== 'boolean' ||
    typeof createdAt !== 'string' ||
    Number.isNaN(Date.parse(createdAt)) ||
    typeof lastUpdatedAt !== 'string' ||
    Number.isNaN(Date.parse(lastUpdatedAt)) ||
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === 'string' && tag.length > 0)
  ) {
    return false;
  }

  if (
    !categoryOptions.includes(category as Category) ||
    !cityOptions.includes(city as City) ||
    !priorityOptions.includes(priority as Priority) ||
    !statusOptions.includes(status as Status)
  ) {
    return false;
  }

  const formValues: CaseFormValues = {
    assignedTo,
    category: category as Category,
    city: city as City,
    customerName,
    description,
    estimatedLoss: String(estimatedLoss),
    isEscalated,
    priority: priority as Priority,
    status: status as Status,
    title,
  };

  return Object.keys(validateCaseForm(formValues)).length === 0;
}

export function isStoredCaseList(value: unknown): value is CaseType[] {
  return Array.isArray(value) && value.every(isStoredCase);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
