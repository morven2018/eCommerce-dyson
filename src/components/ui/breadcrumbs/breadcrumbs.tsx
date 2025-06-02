import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        maxItems={2}
        sx={{
          display: { xs: 'flex', sm: 'flex' },
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
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
