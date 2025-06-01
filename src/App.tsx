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
import { RedirectIfNotAuthenticatedRoute } from '@components/routes/RedirectIfNotAuthenticatedRoute';
import { ProfilePage } from '@pages/profile/Profile';
import { ProductPage } from '@pages/product/Product';
import { CategoryPage } from '@pages/catalog/category/CategoryPage';
import { CatalogPage } from '@pages/catalog/CatalogPage';

export function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
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

        <Route
          path="/profile"
          element={
            <RedirectIfNotAuthenticatedRoute>
              <ProfilePage />
            </RedirectIfNotAuthenticatedRoute>
          }
        />

        <Route
          path="/catalog/vacuums"
          element={<CategoryPage page="vacuums" />}
        />
        <Route
          path="/catalog/hair-care"
          element={<CategoryPage page="hair-care" />}
        />
        <Route
          path="/catalog/heater"
          element={<CategoryPage page="heater" />}
        />
        <Route
          path="/catalog/headphones"
          element={<CategoryPage page="headphones" />}
        />
        <Route
          path="/catalog/lighting"
          element={<CategoryPage page="lighting" />}
        />
        <Route path="/product/:productId" element={<ProductPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}
