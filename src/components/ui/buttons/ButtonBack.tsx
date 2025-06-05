import { useNavigate } from 'react-router-dom';
import styles from './Buttons.module.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button className={styles.buttonBack} onClick={handleGoBack}>
      Back
    </button>
  );
};
