import { getAnonymousSessionToken } from '@shared/api/commerce-tools/getAnonymousSessionToken';

export const addAnonymousSessionTokenToLS = async () => {
  const result = await getAnonymousSessionToken();
  if (result) {
    const tokenName = 'AnonymousDysonToken';
    localStorage.setItem(tokenName, result.access_token);
  }
};
