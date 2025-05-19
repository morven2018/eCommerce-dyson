import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { ReactNode } from 'react';

interface ShowDialogProps {
  message: string;
  onClose: () => void;
  additionalButton?: ReactNode;
}

export default function ShowDialog({
  message,
  onClose,
  additionalButton,
}: ShowDialogProps) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <div>
          {additionalButton}
          <Button onClick={onClose} color="primary" autoFocus>
            Close
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
