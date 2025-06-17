import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { commercetoolsConfig } from './config';

export async function checkTokenValidity() {
  const authUrl = commercetoolsConfig.authUrl;

  const clientId = commercetoolsConfig.clientId;
  const clientSecret = commercetoolsConfig.clientSecret;

  const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
  const introspectUrl = `${authUrl}/oauth/introspect`;

  const token = getTokenFromLS();
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

    if (data.active) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
