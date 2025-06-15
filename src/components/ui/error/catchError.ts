import { openDialog } from '@services/DialogService';

export function handleCatchError(error: unknown, defaultMessage: string): void {
  let message = defaultMessage;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  openDialog(message, true);
}
