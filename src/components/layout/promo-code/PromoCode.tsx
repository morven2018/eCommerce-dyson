import styles from './PromoCode.module.scss';
import { useState } from 'react';
import discountTen from '@assets/images/discount-10.jpg';
import discountTwenty from '@assets/images/discount-20.jpg';
import discountThirty from '@assets/images/discount-30.jpg';

export default function PromoCode() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPromoCode('');
    setMessage('');
  };

  const handleApplyPromoCode = async () => {
    setIsApplying(true);
    setMessage('');
    try {
      // Mock API call to commercetools (replace with real API endpoint)
      const response = await fetch('/api/apply-promo-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCode }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage(
          `Promo code ${promoCode} applied successfully! Discount: ${data.discount}%`
        );
      } else {
        setMessage('Invalid promo code. Please try again.');
      }
    } catch (error) {
        console.error('Promo code application failed:', error);
      setMessage('Error applying promo code. Please try again later.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className={styles.promoBlock}>
      <div className={styles.promoContent}>
        <h3 className={styles.promoTitle}>
          Welcome to Dyson! <br /> <span>GET your promo code NOW!</span>
        </h3>
        <div className={styles.promoImages}>
          <img
            src={discountThirty}
            alt="30% off promo code"
            className={styles.promoImage30}
          />
          <img
            src={discountTwenty}
            alt="20% off promo code"
            className={styles.promoImage20}
          />
          <img
            src={discountTen}
            alt="10% off promo code"
            className={styles.promoImage10}
          />
        </div>
        <button className={styles.promoButton} onClick={handleButtonClick}>
          Get Promo Code
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Available Promo Codes</h3>
            <ul className={styles.promoList}>
              <li>30% off on orders over $1000</li>
              <li>20% off on your first order</li>
              <li>10% off for Authorized users</li>
            </ul>
            <div className={styles.promoInputContainer}>
              <input
                type="text"
                className={styles.promoInput}
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className={styles.applyButton}
                onClick={handleApplyPromoCode}
                disabled={isApplying}
              >
                {isApplying ? 'Applying...' : 'APPLY'}
              </button>
            </div>
            {message && <p className={styles.message}>{message}</p>}
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
