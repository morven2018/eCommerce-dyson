import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

interface ShowDialogProps {
  message: string;
  onClose: () => void;
}

export default function ShowDialog({ message, onClose }: ShowDialogProps) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
