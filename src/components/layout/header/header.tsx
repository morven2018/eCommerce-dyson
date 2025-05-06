import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
// import { BorderRadius, Colors } from '../../../shared/constants/style-enums';
import { CustomContainer } from '../../ui/container';
// import { Link } from 'react-router-dom';

import logo from '../../../assets/icons/logo-dyson.svg';
// import { Sizes } from './header-style';
import { NavText } from '../../../shared/constants/text-fields';

import emptyCart from '../../../assets/icons/cart.svg';
import cart from '../../../assets/icons/cart-with-smth.svg';
import profile from '../../../assets/icons/profile.svg';
import './header.scss';

const isCartEmpty = true;
const isUserUnauthorized = true;

interface INavItems {
  text: string;
  icon: string;
  onclick: () => void;
}

const navItems = [
  {
    text: NavText.Catalog,
    icon: '',
    onclick: () => {},
  },
  {
    text: NavText.About,
    icon: '',
    onclick: () => {},
  },
  {
    text: isUserUnauthorized ? NavText.Register : NavText.Logout,
    icon: '',
    onclick: () => {},
  },
  {
    text: isUserUnauthorized ? NavText.Login : NavText.Profile,
    icon: isUserUnauthorized ? '' : profile,
    onclick: () => {},
  },
  {
    text: NavText.Cart,
    icon: isCartEmpty ? emptyCart : cart,
    onclick: () => {},
  },
];

const ItemList: React.FC<INavItems> = ({ text, icon, onclick }) => {
  if (icon)
    return (
      <ListItem>
        <ListItemButton onClick={onclick}>
          <ListItemIcon>
            <img src={icon} alt={text} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    );
  else
    return (
      <ListItem>
        <ListItemButton onClick={onclick}>
          <ListItemText primary={<NonBreakingText text={text} />} />
        </ListItemButton>
      </ListItem>
    );
};

const NonBreakingText = ({ text }: { text: string }) => (
  <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
);

export const Header: React.FC = () => {
  const NavMenu = (
    <List>
      {navItems.map((item) => (
        <ItemList key={item.text} {...item}></ItemList>
      ))}
    </List>
  );

  return (
    <AppBar position="static" className="header">
      <CustomContainer maxWidth="xl" className="content">
        <Box>
          <Box className="subheader">
            <Toolbar
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 0,
              }}
            >
              {' '}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="home"
                component="a"
                href="./index.html"
                // component={Link}
                // to="/"
              >
                <Box
                  component="img"
                  src={logo}
                  alt="To home page dyson"
                  className="logo"
                />
              </IconButton>
              <Box component="nav">{NavMenu}</Box>
            </Toolbar>
          </Box>
          <Box className="subheader">fast catalog</Box>
        </Box>
      </CustomContainer>
    </AppBar>
  );
};
