import { ListItemText, Menu, MenuItem } from '@mui/material';

import styles from './ProfileMenu.module.scss';
import { INavItems } from '@components/layout/header/header';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@shared/context/cart/useCart';
import { NavText } from '@shared/constants/text-fields';

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: INavItems[];
}

export const ProfileMenu = ({
  anchorEl,
  open,
  onClose,
  items,
}: ProfileMenuProps) => {
  const navigate = useNavigate();
  const { cartItemsCount } = useCart();
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      className={styles.menu}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        className: styles.menuList,
      }}
    >
      {items.map((item) => (
        <MenuItem
          key={`${item.text}`}
          onClick={() => {
            onClose();
            item.onClick();
            navigate(item.path);
          }}
          className={styles.menuItem}
        >
          <ListItemText className={styles.listItem}>{item.text}</ListItemText>
          <span className={styles.quantity}>
            {item.text === NavText.Cart && cartItemsCount > 0
              ? `   ${cartItemsCount}`
              : ''}
          </span>
        </MenuItem>
      ))}
    </Menu>
  );
};
