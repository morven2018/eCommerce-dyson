import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <>
      <h2>This About page</h2>
      <div>
        Go <Link to={'/'}>home</Link>
      </div>
    </>
  );
};
