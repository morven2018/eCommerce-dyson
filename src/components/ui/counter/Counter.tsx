import { useState } from 'react';
import styles from './Counter.module.scss';

interface CounterProps {
  readonly price: number;
}

export default function Counter({ price }: CounterProps) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const totalSum = quantity * price;

  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        <button
          className={styles.button}
          onClick={handleDecrement}
          disabled={quantity === 1}
        >
          -
        </button>
        <input
          className={styles.input}
          type="number"
          value={quantity}
          readOnly
        />
        <button className={styles.button} onClick={handleIncrement}>
          +
        </button>
      </div>
      <span className={styles.sum}>Total: {totalSum.toFixed(2)}$</span>
    </div>
  );
}
