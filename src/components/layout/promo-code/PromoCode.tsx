// import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoCode.module.scss';
import { useAuth } from '@shared/context/auth-hooks';
import { useState } from 'react';

export default function PromoCode() {
  const { isUserUnauthorized } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (isUserUnauthorized) {
      navigate('/register');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.promoBlock}>
      {isUserUnauthorized ? (
        <div className={styles.promoContent}>
          <h3 className={styles.promoTitle}>
            REGISTER NOW <br /> to get <span>15% off</span> your first purchase!
          </h3>
          <p className={styles.promoText}>
            First time at Dyson?
            <br /> <span>Sign up</span> and grab promo code <br /> FIRST15 for
            15% off!
          </p>
          <button className={styles.promoButton} onClick={handleButtonClick}>
            Register
          </button>
        </div>
      ) : (
        <div className={styles.promoContent}>
          <h3 className={styles.promoTitle}>
            Welcome to Dyson! <br /> As a new customer, enjoy{' '}
            <span>15% off</span> your first purchase!
          </h3>
          <p className={styles.promoText}>
            with code <span>NEW15</span>!
          </p>
          <button className={styles.promoButton} onClick={handleButtonClick}>
            Get Promo Codes
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Available Promo Codes</h3>
            <ul className={styles.promoList}>
              <li>NEW15 - 15% off your first purchase</li>
              <li>SUMMER25 - 25% off select items</li>
              <li>FREEDELIVERY - Free shipping on orders over $50</li>
            </ul>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
