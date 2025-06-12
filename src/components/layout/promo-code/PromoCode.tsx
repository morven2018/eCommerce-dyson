import { useState, useRef } from 'react';
import styles from './PromoCode.module.scss';
import discountTen from '@assets/images/discount-10.jpg';
import discountTwenty from '@assets/images/discount-20.jpg';
import discountThirty from '@assets/images/discount-30.jpg';

interface Toast {
  code: string;
}

export default function PromoCode() {
  const [toast, setToast] = useState<Toast | null>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setToast({ code: textToCopy });
      setTimeout(() => setToast(null), 1500);
    } catch (err) {
      console.error('Copy error: ', err);
    }
  };

  return (
    <div className={styles.promoBlock}>
      <h3 className={styles.promoTitle}>
        Welcome to Dyson! <br /> <span>GET your promo code NOW!</span>
      </h3>
      <div className={styles.promoCards}>
        {[
          { code: 'LUCKY-30', img: discountThirty, alt: '30% off promo code' },
          { code: 'DYSON-20', img: discountTwenty, alt: '20% off promo code' },
          { code: 'SUMMER-10', img: discountTen, alt: '10% off promo code' },
        ].map(({ code, img, alt }) => (
          <div key={code} className={styles.card}>
            <div className={styles.cardOverlay}></div>
            <img src={img} alt={alt} className={styles.promoImage} />
            <div className={styles.buttonWrapper}>
              <button
                ref={(el: HTMLButtonElement | null) => {
                  if (el) {
                    buttonRefs.current.set(code, el);
                  }
                }}
                className={`${styles.promoButton} ${toast?.code === code ? styles.copied : ''}`}
                onClick={() => handleCopy(code)}
                aria-label={`Copy promo code ${code}`}
              >
                {code}
              </button>
              {toast?.code === code && (
                <div className={styles.toast} role="status" aria-live="polite">
                  <svg
                    className={styles.checkmark}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
