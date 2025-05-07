import React, { useState } from 'react';
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

import logo from '../../../assets/icons/logo-dyson.svg';
import { NavText } from '../../../shared/constants/text-fields';

import emptyCart from '../../../assets/icons/cart.svg';
import cart from '../../../assets/icons/cart-with-smth.svg';
import profile from '../../../assets/icons/profile.svg';

import { Link, useNavigate } from 'react-router-dom';

import { Burger } from '../../ui/burger/burger/burger';
import styles from './Header.module.scss';
import { ProfileMenu } from '../../ui/burger/menu/profile-menu';

const isCartEmpty = true;
const isUserUnauthorized = true;

export interface INavItems {
  text: string;
  icon: string;
  path: string;
  onclick: () => void;
}

const navItems = [
  {
    text: NavText.Catalog,
    icon: '',
    path: '/catalog',
    onclick: () => {},
  },
  {
    text: NavText.About,
    icon: '',
    path: '/about',
    onclick: () => {},
  },
  {
    text: isUserUnauthorized ? NavText.Register : NavText.Logout,
    icon: '',
    path: isUserUnauthorized ? '/register' : '/',
    onclick: () => {},
  },
  {
    text: isUserUnauthorized ? NavText.Login : NavText.Profile,
    icon: isUserUnauthorized ? '' : profile,
    path: isUserUnauthorized ? '/login' : '/profile',
    onclick: () => {},
  },
  {
    text: NavText.Cart,
    icon: isCartEmpty ? emptyCart : cart,
    path: '/cart',
    onclick: () => {},
  },
];

export const ItemList: React.FC<INavItems> = ({
  text,
  icon,
  path,
  onclick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onclick();
    navigate(path);
  };

  if (icon)
    return (
      <ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon
            className={styles.iconWrapper}
            sx={{ minWidth: '28px' }}
          >
            <img src={icon} alt={text} className={styles.icon} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    );
  else
    return (
      <ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={<NonBreakingText text={text} />} />
        </ListItemButton>
      </ListItem>
    );
};

const NonBreakingText = ({ text }: { text: string }) => (
  <span className={styles.buttons}>{text}</span>
);

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const NavMenu = (
    <List className={styles.itemList}>
      {navItems.map((item) => (
        <ItemList key={item.text} {...item}></ItemList>
      ))}
    </List>
  );

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
              <Box component="nav">{NavMenu}</Box>
            </Toolbar>
          </Box>
          <Box className={styles.subheader}>fast catalog</Box>
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
