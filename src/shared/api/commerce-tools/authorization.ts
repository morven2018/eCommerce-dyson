import { Buffer } from 'buffer';
import { commercetoolsConfig } from './config';
import { openDialog } from '@services/DialogService';

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
  data: UserData,
  successMessage?: string
): Promise<AuthTokenResponse | null> {
  const authUrl = commercetoolsConfig.authUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${authUrl}/oauth/${projectKey}/customers/token`;
  const clientId = commercetoolsConfig.clientId;
  const clientSecret = commercetoolsConfig.clientSecret;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  );

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', data.email);
  body.append('password', data.password);
  body.append(
    'scope',
    `view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey} view_products:${projectKey} manage_customers:${projectKey} manage_orders:${projectKey}`
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
      const errorMessage = errorDetails.message;
      throw new Error(`Auth failed: ${errorMessage}`);
    }

    const result: AuthTokenResponse = await response.json();
    const dialogMessage = successMessage ?? 'Authorized successfully';
    openDialog(dialogMessage);
    return result;
  } catch (error) {
    let message = 'Error customer authorization';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    openDialog(message);

    return null;
  }
}
