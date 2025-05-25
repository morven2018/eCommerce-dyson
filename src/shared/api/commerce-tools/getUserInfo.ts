import { commercetoolsConfig } from './config';

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  const accessToken = localStorage.getItem('authDysonToken');

  if (!accessToken) {
    console.error('No access token found');
    return null;
  }

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/me`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('access_token');
      }
      throw new Error(`Failed to fetch customer data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return null;
  }
}
