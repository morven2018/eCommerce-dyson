import { Buffer } from 'buffer';
import { commercetoolsConfig } from './config';
import { handleCatchError } from '@components/ui/error/catchError';

interface AnonymousTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

export const getAnonymousSessionToken =
  async (): Promise<AnonymousTokenResponse | null> => {
    const authUrl = commercetoolsConfig.authUrl;
    const projectKey = commercetoolsConfig.projectKey;
    const url = `${authUrl}/oauth/${projectKey}/anonymous/token`;
    const clientId = commercetoolsConfig.clientId;
    const clientSecret = commercetoolsConfig.clientSecret;

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64'
    );

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append(
      'scope',
      `view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey} view_products:${projectKey} manage_orders:${projectKey}`
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

      return await response.json();
    } catch (error) {
      handleCatchError(error, 'Error customer authorization');
      return null;
    }
  };
