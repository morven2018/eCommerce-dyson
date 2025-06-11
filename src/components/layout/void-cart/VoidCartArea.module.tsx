import { Button } from '@mui/material';
import icon from '../../../assets/icons/void-cart.svg';
import { useNavigate } from 'react-router-dom';

export default function VoidCartArea() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalog');
  };

  return (
    <div>
      <div>
        <h4>Cart</h4>
        <div>
          <div>Total: 0</div>
          <div>No items added</div>
        </div>
        <img src={icon} alt="Void Cart" />
        <h3>Cart is empty</h3>
        <Button onClick={handleClick}>see our catalog</Button>
      </div>
    </div>
  );
}
