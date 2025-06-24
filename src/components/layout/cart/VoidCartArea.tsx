import { Button } from '@mui/material';
import icon from '@assets/icons/void-cart.svg';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';

export default function VoidCartArea() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalog');
  };

  return (
    <div className={styles.cartTable}>
      <div className={styles.cartHeader}>
        <h4>Cart</h4>
        <div className={styles.cartHeaderInfo}>
          <div>Total: $0</div>
          <div className={styles.items}>No items added</div>
        </div>
      </div>
      <img src={icon} alt="Void Cart" className={styles.voidIcon} />
      <h3>Cart is empty</h3>
      <Button onClick={handleClick} className={styles.button}>
        see our catalog
      </Button>
    </div>
  );
}
