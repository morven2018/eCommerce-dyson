import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './index.scss';
import { initializeAnonymousSession } from '@shared/api/commerce-tools/anonymousSessionService';
import { getAnonymousSessionToken } from '@shared/api/commerce-tools/getAnonymousSessionToken';

try {
  await initializeAnonymousSession();
} catch {
  getAnonymousSessionToken();
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
