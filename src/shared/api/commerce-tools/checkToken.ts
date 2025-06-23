import { commercetoolsConfig } from './config';
import { handleCatchError } from '@components/ui/error/catchError';

export async function checkTokenValidity() {
  const authUrl = commercetoolsConfig.authUrl;

  const clientId = commercetoolsConfig.clientId;
  const clientSecret = commercetoolsConfig.clientSecret;

  const credentials = `${clientId}:${clientSecret}`;
  const base64Credentials = btoa(credentials);
  const authHeader = `Basic ${base64Credentials}`;

  const introspectUrl = `${authUrl}/oauth/introspect`;

  const token = localStorage.getItem('authDysonToken');
  if (!token) return false;

  try {
    const response = await fetch(introspectUrl, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${encodeURIComponent(token)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return !!data.active;
  } catch (error) {
    handleCatchError(error, 'Error check is token active');
    return false;
  }
}
