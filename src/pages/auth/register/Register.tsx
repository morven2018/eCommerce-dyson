import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <>
      <h2>Page Register</h2>
      <h3>Do you like shopping ?</h3>
      <div>
        Go <Link to={'/'}>home</Link>
      </div>
    </>
  );
};
