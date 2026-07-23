import type { Status } from '../types';

const allowedStatusTransitions: Record<Status, Status[]> = {
  open: ['in_progress'],
  in_progress: ['open', 'resolved'],
  resolved: ['in_progress', 'closed'],
  closed: [],
};

export function canChangeCaseStatus(currentStatus: Status, nextStatus: Status) {
  return (
    currentStatus === nextStatus ||
    allowedStatusTransitions[currentStatus].includes(nextStatus)
  );
}

export function getAvailableCaseStatuses(currentStatus: Status) {
  return [currentStatus, ...allowedStatusTransitions[currentStatus]];
}
