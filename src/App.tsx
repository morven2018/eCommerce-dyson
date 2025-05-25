import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/Home';
import { LoginPage } from './pages/auth/login/Login';
import { RegisterPage } from './pages/auth/register/Register';
import { AboutPage } from './pages/about/About';
import { NotFoundPage } from './pages/not-found/Notfound';
import { Header } from './components/layout/header/header';
import Footer from './components/layout/footer/Footer';
import { AuthProvider } from './shared/context/auth-context';
import { RedirectIfAuthenticatedRoute } from './components/routes/RedirectIfAuthenticatedRoute';
import { ProfilePage } from '@pages/profile/Profile';

export function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticatedRoute>
              <LoginPage />
            </RedirectIfAuthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuthenticatedRoute>
              <RegisterPage />
            </RedirectIfAuthenticatedRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}
