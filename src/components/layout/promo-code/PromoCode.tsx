// import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoCode.module.scss';
import { useAuth } from '@shared/context/auth-hooks';

export default function PromoCode() {
  const { isUserUnauthorized } = useAuth();
  const navigate = useNavigate();

  if (!isUserUnauthorized) {
    return null;
  }

  const handleButtonClick = () => {
    navigate('/register');
  };

  return (
    <div className={styles.promoBlock}>
      <div className={styles.promoContent}>
        <h3 className={styles.promoTitle}>
          Register now <br /> to get 15% off your first purchase
        </h3>
        <p className={styles.promoText}>
          First time at Dyson? Sign up and grab promo code FIRST15 for 15% off!
        </p>

        <button className={styles.promoButton} onClick={handleButtonClick}>
          Register
        </button>
      </div>
    </div>
  );
}
