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

type InputState = 'ready' | 'error' | 'applied';

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
  const [currentState, setCurrentState] = useState<InputState>('ready');

  useEffect(() => {
    setInputValue(value);
    setCurrentState(isApplied ? 'applied' : 'ready');
  }, [value, isApplied]);

  const handleApply = async () => {
    if (!inputValue.trim() || isProcessing) return;

    setIsProcessing(true);
    setError('');

    const validation = validatePromoCode(inputValue, cartTotal);
    if (!validation.isValid) {
      setError(validation.error ?? 'Invalid promo code');
      setCurrentState('error');
      setIsProcessing(false);
      return;
    }

    try {
      const success = await onApply(inputValue);
      if (success) {
        setCurrentState('applied');
      } else {
        setError('Failed to apply promo code');
        setCurrentState('error');
      }
    } catch {
      setError('Error applying promo code');
      setCurrentState('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = () => {
    setInputValue('');
    setError('');
    setCurrentState('ready');
    onReset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (currentState === 'error') {
      setError('');
      setCurrentState('ready');
    }
  };

  const renderEndAdornment = () => {
    if (isProcessing) {
      return <CircularProgress size={24} />;
    }

    switch (currentState) {
      case 'ready':
        return (
          <IconButton
            onClick={handleApply}
            edge="end"
            title="Apply"
            aria-label="Apply promo code"
            disabled={!inputValue.trim()}
            className={styles.applyButton}
          >
            <img src={ApplyIcon} alt="Apply" className={styles.applyImage} />
          </IconButton>
        );

      case 'error':
        return (
          <IconButton
            onClick={handleRemove}
            edge="end"
            title="Clear promo"
            aria-label="Remove promo code"
          >
            <CloseIcon />
          </IconButton>
        );

      case 'applied':
        return null;

      default:
        return null;
    }
  };

  const getHelperText = () => {
    switch (currentState) {
      case 'applied':
        return 'Promo code applied';
      case 'error':
        return error;
      default:
        return inputValue.trim()
          ? 'Press apply to use promo code'
          : 'Enter your promo code';
    }
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={currentState === 'error'}
      className={styles.promoCodeControl}
    >
      <InputLabel>Promo Code</InputLabel>
      <OutlinedInput
        value={inputValue}
        onChange={handleChange}
        label="Promo Code"
        disabled={currentState === 'applied' || disabled || isLoading}
        endAdornment={
          <InputAdornment position="end">{renderEndAdornment()}</InputAdornment>
        }
      />
      <FormHelperText>{getHelperText()}</FormHelperText>
    </FormControl>
  );
};
