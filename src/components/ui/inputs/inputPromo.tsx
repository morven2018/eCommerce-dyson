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

export const PromoCodeInput = () => {
  const INPUT_ID = 'promo-code';
  const INPUT_LABEL = 'Apply promo';
  const SUCCESS_MESSAGE = 'Promo code applied successfully!';
  //const ERROR_MESSAGGE =
  //  "You don't meet the conditions to apply this promo code";
  const PROMPT_MESSAGE = 'Enter your promo code';

  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
    setError(false);
  };

  const handleApply = () => {
    if (promoCode.trim()) {
      setIsPromoApplied(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleReset = () => {
    setPromoCode('');
    setIsPromoApplied(false);
    setError(false);
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={error}
      disabled={isPromoApplied}
    >
      <InputLabel htmlFor={INPUT_ID}>{INPUT_LABEL}</InputLabel>
      <OutlinedInput
        id={INPUT_ID}
        type="text"
        value={promoCode}
        onChange={handleChange}
        label={INPUT_LABEL}
        className={styles.input}
        endAdornment={
          <InputAdornment position="end">
            {isPromoApplied ? (
              <IconButton
                aria-label="Reset promo code"
                onClick={handleReset}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="Apply promo code"
                onClick={handleApply}
                color="primary"
                edge="end"
                disabled={!promoCode.trim()}
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
      <FormHelperText>
        {isPromoApplied ? SUCCESS_MESSAGE : PROMPT_MESSAGE}
      </FormHelperText>
    </FormControl>
  );
};

PromoCodeInput.displayName = 'PromoCodeInput';
