import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import ApplyIcon from '../../../assets/icons/apply-promo.png';
import CloseIcon from '@mui/icons-material/Close';
import styles from './input.module.scss';
import validatePromoCode from '@shared/utlis/validatePromocode';

interface PromoCodeInputProps {
  cartTotal: number;
  onApply: (code: string) => Promise<boolean>;
  isLoading?: boolean;
  value: string;
  isApplied: boolean;
  onReset: () => void;
  disabled?: boolean;
}

export const PromoCodeInput = ({
  cartTotal,
  onApply,
  isLoading = false,
  value,
  isApplied,
  onReset,
  disabled = false,
}: PromoCodeInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleApply = async () => {
    if (!inputValue.trim() || isProcessing) return;

    setIsProcessing(true);
    setError('');

    const validation = validatePromoCode(inputValue, cartTotal);
    if (!validation.isValid) {
      setError(validation.error ?? 'Invalid promo code');
      setIsProcessing(false);
      return;
    }

    try {
      const success = await onApply(inputValue);
      if (!success) {
        setError('Failed to apply promo code');
      }
    } catch {
      setError('Error applying promo code');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = () => {
    setInputValue('');
    setError('');
    onReset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError('');
  };

  const showApplyButton = !isApplied && inputValue && !isProcessing && !error;
  const showResetButton = (inputValue && !isProcessing) || isApplied;
  const isInputDisabled = isApplied || disabled || isLoading;

  const renderEndAdornment = () => {
    if (isProcessing) {
      return <CircularProgress size={24} />;
    }
    if (showApplyButton) {
      return (
        <IconButton
          onClick={handleApply}
          edge="end"
          aria-label="Apply promo code"
        >
          <img src={ApplyIcon} alt="Apply" className={styles.applyImage} />
        </IconButton>
      );
    }
    if (showResetButton) {
      return (
        <IconButton
          onClick={handleRemove}
          edge="end"
          disabled={isLoading}
          aria-label="Remove promo code"
        >
          <CloseIcon />
        </IconButton>
      );
    }
    return null;
  };

  return (
    <FormControl variant="outlined" fullWidth error={!!error}>
      <InputLabel>Promo Code</InputLabel>
      <OutlinedInput
        value={inputValue}
        onChange={handleChange}
        label="Promo Code"
        disabled={isInputDisabled}
        endAdornment={
          <InputAdornment position="end">{renderEndAdornment()}</InputAdornment>
        }
      />
      <FormHelperText>
        {error ?? (isApplied ? 'Promo code applied' : 'Enter your promo code')}
      </FormHelperText>
    </FormControl>
  );
};
