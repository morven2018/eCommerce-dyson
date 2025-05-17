import styles from './ButtonList.module.scss';

import vacuums from '../../../../assets/icons/vacuums.svg';
import hair from '../../../../assets/icons/hair-care.svg';
import heater from '../../../../assets/icons/heater.svg';
import headphone from '../../../../assets/icons/headphone.svg';
import light from '../../../../assets/icons/lighting.svg';
import { INavItems } from '../header';
import { FastCatalog } from '../../../../shared/constants/text-fields';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

export type INavItemsWithoutOnClick = Omit<INavItems, 'onclick'>;

const catalogItems = [
  {
    text: FastCatalog.Vacuums,
    icon: vacuums,
    path: '/catalog/vacuums',
  },
  {
    text: FastCatalog.Hair,
    icon: hair,
    path: '/catalog/hair-care',
  },
  {
    text: FastCatalog.Heater,
    icon: heater,
    path: '/catalog/heater',
  },
  {
    text: FastCatalog.Headphones,
    icon: headphone,
    path: '/catalog/headphones',
  },
  {
    text: FastCatalog.Lighting,
    icon: light,
    path: '/catalog/lighting',
  },
];

export const ButtonList = () => {
  return (
    <List className={styles.buttonList}>
      {catalogItems.map((item) => (
        <ListItem key={item.text} className={styles.fastCatalogItem}>
          <ListItemButton component={Link} to={item.path}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <img src={item.icon} alt={item.text} className={styles.icon} />
            </ListItemIcon>
            <ListItemText primary={item.text} className={styles.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
