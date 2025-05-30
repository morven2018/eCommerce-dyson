import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passwordValidationSchema } from '@shared/lib/validator/validator';
import styles from './modal.module.scss';

interface PasswordConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (currentPassword: string) => Promise<void>;
}

const schema = yup.object().shape({
  currentPassword: passwordValidationSchema,
});

export function PasswordConfirmModal({
  open,
  onClose,
  onConfirm,
}: PasswordConfirmModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: { currentPassword: string }) => {
    try {
      setIsSubmitting(true);
      setError('');
      await onConfirm(data.currentPassword);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Password verification failed'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className={styles.modal}
    >
      <DialogContent>
        <DialogContentText className={styles.text}>
          You need to input your current password to update it.
        </DialogContentText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Current Password"
                type="password"
                autoComplete="current-password"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            )}
          />

          {error && (
            <DialogContentText color="error">{error}</DialogContentText>
          )}

          <DialogActions className={styles.buttonList}>
            <Button
              onClick={onClose}
              disabled={isSubmitting}
              className={styles.buttonClose}
            >
              Close
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              className={styles.button}
            >
              {isSubmitting ? 'Updating...' : 'Update password'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
