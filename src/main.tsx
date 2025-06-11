import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './index.scss';
import { addAnonymousSessionTokenToLS } from '@shared/utlis/token/addAnonymousSessionTokenToLS';

const tokenName = 'authDysonToken';
const existingToken = localStorage.getItem(tokenName);
if (!existingToken) {
  addAnonymousSessionTokenToLS();
  localStorage.removeItem('cartIdDyson'); // Временное решение может быть изменено !!!
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
