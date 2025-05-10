import Popular from '../../components/layout/popular/Popular';
import Bestseller from '../../components/layout/bestseller/Bestseller';
import Media from '../../components/layout/media/Media';

export const HomePage = () => {
  return (
    <>
      <Bestseller />
      <Popular />
      <Media />
    </>
  );
};
