import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  path: string;
  name: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {items.map((item, index) =>
          index < items.length - 1 ? (
            <Link
              key={index}
              component={RouterLink}
              to={item.path}
              color="inherit"
              underline="hover"
            >
              {item.name}
            </Link>
          ) : (
            <Typography key={index} color="text.primary">
              {item.name}
            </Typography>
          )
        )}
      </MuiBreadcrumbs>
    </div>
  );
};
