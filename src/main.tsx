import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './index.scss';
import { initializeAnonymousSession } from '@shared/api/commerce-tools/anonymousSessionService';
import { getAnonymousSessionToken } from '@shared/api/commerce-tools/getAnonymousSessionToken';
import { checkTokenValidity } from '@shared/api/commerce-tools/checkToken';
import { getCurrentCustomer } from '@shared/api/commerce-tools/getUserInfo';

(async () => {
  try {
    if (!localStorage.getItem('authDysonToken')) {
      await initializeAnonymousSession();
    } else {
      const check = await checkTokenValidity();
      const checkProfile = await getCurrentCustomer();
      if (!check || !checkProfile) {
        localStorage.clear();
        await initializeAnonymousSession();
      }
    }
  } catch {
    await getAnonymousSessionToken();
  }

  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
})();
