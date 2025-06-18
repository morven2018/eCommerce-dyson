import { commercetoolsConfig } from './config';
import { getAnonymousSessionToken } from './getAnonymousSessionToken';

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  const accessToken = localStorage.getItem('authDysonToken');

  if (!accessToken) throw new Error('No access token found');

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/me`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('authDysonToken');
      getAnonymousSessionToken();
      localStorage.removeItem('cartIdDyson');
      localStorage.removeItem('password');
      localStorage.removeItem('PromoCode');
      throw new Error('Session expired. Please log in again.');
    }
    throw new Error(`Failed to fetch customer data (HTTP ${response.status})`);
  }

  return await response.json();
}
