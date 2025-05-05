import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
      <h2>Page 404</h2>
      <div>
        Go <Link to={'/'}>home</Link>
      </div>
    </>
  );
};
