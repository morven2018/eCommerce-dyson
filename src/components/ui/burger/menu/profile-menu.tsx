import React from 'react';
import { ListItemText, Menu, MenuItem } from '@mui/material';

// import { Link } from 'react-router-dom';
import styles from './ProfileMenu.module.scss';
import { INavItems } from '../../../layout/header/header';

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: INavItems[];
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  open,
  onClose,
  items,
}) => {
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
            item.onclick();
          }}
          className={styles.menuItem}
        >
          <ListItemText className={styles.listItem}>{item.text}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};
