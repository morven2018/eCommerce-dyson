import { useState, useEffect } from 'react';
import styles from './Counter.module.scss';

interface CounterProps {
  readonly price: number;
  readonly amount: number;
  readonly disabled?: boolean;
  readonly onChange?: (value: number) => void;
}

export default function Counter({
  price,
  amount,
  disabled,
  onChange,
}: CounterProps) {
  const [quantity, setQuantity] = useState(amount);

  useEffect(() => {
    setQuantity(amount);
  }, [amount]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onChange?.(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onChange?.(quantity + 1);
  };

  const totalSum = quantity * price;

  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        <button
          className={styles.button}
          onClick={handleDecrement}
          disabled={disabled || quantity === 1}
        >
          -
        </button>
        <input
          className={styles.input}
          type="number"
          value={quantity}
          readOnly
          disabled={disabled}
        />
        <button
          className={styles.button}
          onClick={handleIncrement}
          disabled={disabled}
        >
          +
        </button>
      </div>
      <span className={styles.sum}>Total: ${totalSum.toFixed(2)}</span>
    </div>
  );
}
