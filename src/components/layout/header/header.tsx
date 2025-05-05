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
import { BorderRadius, Colors } from '../../../shared/constants/style-enums';
import { CustomContainer } from '../../ui/container';
// import { Link } from 'react-router-dom';

import logo from '../../../assets/icons/logo-dyson.svg';
import { Sizes } from './header-style';
import { NavText } from '../../../shared/constants/text-fields';

import emptyCart from '../../../assets/icons/cart.svg';
import cart from '../../../assets/icons/cart-with-smth.svg';
import profile from '../../../assets/icons/profile.svg';

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
        <ListItemButton onClick={onclick} sx={{ padding: '8px 16px' }}>
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
          <ListItemText
            primary={<NonBreakingText text={text} />}
            sx={{ '.MuiTypography-root': { whiteSpace: 'nowrap' } }}
          />
        </ListItemButton>
      </ListItem>
    );
};

const NonBreakingText = ({ text }: { text: string }) => (
  <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
);

export const Header: React.FC = () => {
  const NavMenu = (
    <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
      {navItems.map((item) => (
        <ItemList key={item.text} {...item}></ItemList>
      ))}
    </List>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: Colors.PrimaryBlack,
        color: Colors.PrimaryWhite,
        boxShadow: 'none',
        borderRadius: BorderRadius,
        height: Sizes.Header,
        padding: 0,
      }}
    >
      <CustomContainer maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
          <Box
            sx={{
              height: Sizes.SubHeader,
            }}
          >
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
                  sx={{ height: Sizes.LogoHeight, width: 'auto' }}
                />
              </IconButton>
              <Box component="nav">{NavMenu}</Box>
            </Toolbar>
          </Box>
          <Box sx={{ height: Sizes.SubHeader }}>fast catalog</Box>
        </Box>
      </CustomContainer>
    </AppBar>
  );
};
