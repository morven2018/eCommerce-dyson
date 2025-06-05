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

const HOME_PATH = '/';
const RESERVE_HOME_PATH = '/index.html';
const CATALOG_PATH = '/catalog';
const ABOUT_PATH = '/about';
const LOGIN_PATH = '/login';
const REGISTER_PATH = '/register';
const PROFILE_PATH = '/profile';
const CATALOG_VACUUMS_PATH = '/catalog/vacuums';
const CATALOG_HAIR_CARE_PATH = '/catalog/hair-care';
const CATALOG_HEATER_PATH = '/catalog/heater';
const CATALOG_HEADPHONES_PATH = '/catalog/headphones';
const CATALOG_LIGHTING_PATH = '/catalog/lighting';
const PRODUCT_PATH = '/product';
const OTHER_PATH = '*';

export function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path={HOME_PATH} element={<HomePage />} />
        <Route path={RESERVE_HOME_PATH} element={<HomePage />} />
        <Route path={CATALOG_PATH} element={<CatalogPage />} />
        <Route path={ABOUT_PATH} element={<AboutPage />} />
        <Route
          path={LOGIN_PATH}
          element={
            <RedirectIfAuthenticatedRoute>
              <LoginPage />
            </RedirectIfAuthenticatedRoute>
          }
        />
        <Route
          path={REGISTER_PATH}
          element={
            <RedirectIfAuthenticatedRoute>
              <RegisterPage />
            </RedirectIfAuthenticatedRoute>
          }
        />

        <Route
          path={PROFILE_PATH}
          element={
            <RedirectIfNotAuthenticatedRoute>
              <ProfilePage />
            </RedirectIfNotAuthenticatedRoute>
          }
        />

        <Route
          path={CATALOG_VACUUMS_PATH}
          element={<CategoryPage page="vacuums" />}
        />
        <Route
          path={CATALOG_HAIR_CARE_PATH}
          element={<CategoryPage page="hair-care" />}
        />
        <Route
          path={CATALOG_HEATER_PATH}
          element={<CategoryPage page="heater" />}
        />
        <Route
          path={CATALOG_HEADPHONES_PATH}
          element={<CategoryPage page="headphones" />}
        />
        <Route
          path={CATALOG_LIGHTING_PATH}
          element={<CategoryPage page="lighting" />}
        />
        <Route path={PRODUCT_PATH}>
          <Route path=":productId" element={<ProductPage />} />
        </Route>

        <Route path={OTHER_PATH} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

// start sprint 4
