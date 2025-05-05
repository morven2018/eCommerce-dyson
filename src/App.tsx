import { Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './pages/home/Home';
import { LoginPage } from './pages/auth/login/Login';
import { RegisterPage } from './pages/auth/register/Register';
import { AboutPage } from './pages/about/About';
import { NotFoundPage } from './pages/not-found/Notfound';

export function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
