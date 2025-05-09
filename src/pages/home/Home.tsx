import Popular from '../../components/layout/popular/Popular';
import Bestseller from '../../components/layout/bestseller/Bestseller';
import Media from '../../components/layout/media/Media';
import Footer from '../../components/layout/footer/Footer';

export const HomePage = () => {
  return (
    <>
      <h2>This Home page</h2>
      <Popular></Popular>
      <Bestseller></Bestseller>
      <Media></Media>
      <Footer></Footer>
    </>
  );
};