import Strengths from '@components/layout/strengths/Strengths';
import Popular from '@components/layout/popular/Popular';
import Bestseller from '@components/layout/bestseller/Bestseller';
import Media from '@components/layout/media/Media';
import PromoCode from '@components/layout/promo-code/PromoCode';

export const HomePage = () => {
  return (
    <>
      <PromoCode />
      <Bestseller />
      <Popular />
      <Strengths />
      <Media />
    </>
  );
};
