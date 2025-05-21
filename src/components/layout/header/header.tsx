import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

import logo from '@assets/icons/logo-dyson.svg';
import { NavText } from '@shared/constants/text-fields';

import emptyCart from '@assets/icons/cart.svg';
import cart from '@assets/icons/cart-with-smth.svg';
import profile from '@assets/icons/profile.svg';

import { Link, useNavigate } from 'react-router-dom';

import { Burger } from '@components/ui/burger/burger/burger';
import styles from './Header.module.scss';
import { ProfileMenu } from '@components/ui/burger/menu/profile-menu';
import { ButtonList } from './button-list/ButtonList';
import { useAuth } from '@shared/context/auth-hooks';

export interface INavItems {
  text: string;
  icon: string;
  path: string;
  onClick: () => void;
}

const NonBreakingText = ({ text }: { text: string }) => (
  <span className={styles.buttons}>{text}</span>
);

const ItemList = ({ text, icon, path, onClick }: INavItems) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(path);
  };

  return (
    <ListItem className={styles.item} disablePadding>
      <ListItemButton onClick={handleClick}>
        {icon ? (
          <ListItemIcon
            className={styles.iconWrapper}
            sx={{ minWidth: '28px' }}
          >
            <img src={icon} alt={text} className={styles.icon} />
          </ListItemIcon>
        ) : (
          <ListItemText primary={<NonBreakingText text={text} />} />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export const Header = () => {
  const { isUserUnauthorized, setIsUserUnauthorized } = useAuth();
  const [isCartEmpty] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [navItems, setNavItems] = useState<INavItems[]>([]);

  const toggleAuthStatus = () => {
    if (!isUserUnauthorized) {
      const tokenName = 'authDysonToken';
      localStorage.removeItem(tokenName);
    }
    setIsUserUnauthorized(!isUserUnauthorized);
  };

  const updateNavItems = () => {
    const updatedItems = [
      {
        text: NavText.Catalog,
        icon: '',
        path: '/catalog',
        onClick: () => {},
      },
      {
        text: NavText.About,
        icon: '',
        path: '/about',
        onClick: () => {},
      },
      {
        text: isUserUnauthorized ? NavText.Register : NavText.Logout,
        icon: '',
        path: isUserUnauthorized ? '/register' : '/',
        onClick: isUserUnauthorized ? () => {} : toggleAuthStatus,
      },
      {
        text: isUserUnauthorized ? NavText.Login : NavText.Profile,
        icon: isUserUnauthorized ? '' : profile,
        path: isUserUnauthorized ? '/login' : '/profile',
        onClick: () => {},
      },
      {
        text: NavText.Cart,
        icon: isCartEmpty ? emptyCart : cart,
        path: '/cart',
        onClick: () => {},
      },
    ];
    setNavItems(updatedItems);
  };

  useEffect(() => {
    updateNavItems();
  }, [isUserUnauthorized, isCartEmpty]);

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Box>
          <Box className={styles.subheader}>
            <Toolbar className={styles.toolbar}>
              <Link to="/">
                <Box
                  component="img"
                  src={logo}
                  alt="To home page dyson"
                  className={styles.logo}
                />
              </Link>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMenu}
                className={styles.burgerButton}
              >
                <Burger isActive={isMenuOpen} />
              </IconButton>
              <Box component="nav">
                <List className={styles.itemList}>
                  {navItems.map((item) => (
                    <ItemList key={`${item.text}-${item.path}`} {...item} />
                  ))}
                </List>
              </Box>
            </Toolbar>
          </Box>
          <Box className={styles.subheaderCatalog}>
            <ButtonList />
          </Box>
        </Box>
      </div>
      <ProfileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && isMenuOpen}
        onClose={handleMenuClose}
        items={navItems}
      />
    </header>
  );
};
