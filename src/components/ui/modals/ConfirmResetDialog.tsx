import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';
import styles from './modal.module.scss';

interface ConfirmResetDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const ConfirmResetDialog = ({
  open,
  onClose,
  onConfirm,
}: ConfirmResetDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className={styles.confirmModal}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reset your cart? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isLoading}
          className={styles.buttonClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          color="error"
          className={styles.button}
        >
          {isLoading ? 'Resetting...' : 'Reset Cart'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
