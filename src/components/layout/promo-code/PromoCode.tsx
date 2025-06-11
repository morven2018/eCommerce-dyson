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
          REGISTER NOW <br /> to get <span>15% off</span> your first purchase!
        </h3>
        <p className={styles.promoText}>
          First time at Dyson?
          <br /> <span>Sign up</span> and grab promo code <br /> FIRST15 for 15%
          off!
        </p>

        <button className={styles.promoButton} onClick={handleButtonClick}>
          Register
        </button>
      </div>
    </div>
  );
}
