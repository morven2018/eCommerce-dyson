import { Buffer } from 'buffer';

interface UserData {
  email: string;
  password: string;
}

interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

export async function userAuthorization(
  data: UserData
): Promise<AuthTokenResponse | null> {
  const authUrl = 'https://auth.us-central1.gcp.commercetools.com';
  const projectKey = 'ecdyson';
  const url = `${authUrl}/oauth/${projectKey}/customers/token`;
  const clientId = 'l9RCU1C8YJODP-E1WBco_lnI';
  const clientSecret = 'AbwcgFey9bzc1JdyYfvgCs7C2hGnOgA8';

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  );

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', data.email);
  body.append('password', data.password);
  body.append(
    'scope',
    `view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey}`
  );

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: body,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Auth failed: ${JSON.stringify(errorDetails)}`);
    }

    const result: AuthTokenResponse = await response.json();
    console.log('Authentication successful:', result);
    return result;
  } catch (error) {
    console.error('Error during customer authorization:', error);

    return null;
  }
}
