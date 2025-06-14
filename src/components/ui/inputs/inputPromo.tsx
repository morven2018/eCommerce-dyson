import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import ApplyIcon from '../../../assets/icons/apply-promo.png';
import CloseIcon from '@mui/icons-material/Close';
import styles from './input.module.scss';
import { PromoCode, overAmount } from '@shared/constants/promocode';

interface PromoCodeInputProps {
  cartTotal: number;
  onApplyPromo: (code: string) => Promise<boolean>;
  isLoading?: boolean;
}

export const PromoCodeInput = ({
  cartTotal,
  onApplyPromo,
  isLoading = false,
}: PromoCodeInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [error, setError] = useState('');
  const [helperText, setHelperText] = useState('Enter your promo code');

  const handleApply = async () => {
    const normalizedCode = inputValue.trim().toUpperCase();

    if (!(normalizedCode in PromoCode)) {
      setError('This promo code does not exist');
      return;
    }

    const minAmount = overAmount[normalizedCode as keyof typeof overAmount];
    if (cartTotal < minAmount) {
      setError(`Minimum order amount: $${(minAmount / 100).toFixed(2)}`);
      return;
    }

    try {
      const success = await onApplyPromo(normalizedCode);
      if (success) {
        setIsPromoApplied(true);
        setHelperText('Promo code applied!');
        setError('');
      } else {
        setError('Failed to apply promo code');
      }
    } catch {
      setError('Error applying promo code');
    }
  };

  const handleReset = async () => {
    try {
      const success = await onApplyPromo('');
      if (success) {
        setIsPromoApplied(false);
        setInputValue('');
        setHelperText('Enter your promo code');
        setError('');
      }
    } catch {
      setError('Error removing promo code');
    }
  };

  return (
    <FormControl variant="outlined" fullWidth error={!!error}>
      <InputLabel>Promo Code</InputLabel>
      <OutlinedInput
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError('');
        }}
        label="Promo Code"
        disabled={isLoading}
        endAdornment={
          <InputAdornment position="end">
            {isPromoApplied ? (
              <IconButton onClick={handleReset} edge="end" disabled={isLoading}>
                <CloseIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleApply}
                disabled={!inputValue.trim() || isLoading}
                edge="end"
              >
                <img
                  src={ApplyIcon}
                  alt="Apply"
                  className={styles.applyImage}
                />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
      <FormHelperText>{error || helperText}</FormHelperText>
    </FormControl>
  );
};
