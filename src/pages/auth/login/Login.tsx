import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <>
      <h2>Page Login</h2>
      <div>
        Go <Link to={'/'}>home</Link>
      </div>
    </>
  );
};
