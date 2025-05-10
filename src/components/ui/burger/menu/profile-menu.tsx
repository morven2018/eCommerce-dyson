import React from 'react';
import { ListItemText, Menu, MenuItem } from '@mui/material';

import styles from './ProfileMenu.module.scss';
import { INavItems } from '../../../layout/header/Header';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
            navigate(item.path);
          }}
          className={styles.menuItem}
        >
          <ListItemText className={styles.listItem}>{item.text}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};
