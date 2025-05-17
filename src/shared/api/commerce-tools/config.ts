export const commercetoolsConfig = {
  authUrl: import.meta.env.VITE_CTP_AUTH_URL,
  apiUrl: import.meta.env.VITE_CTP_API_URL,
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  clientId: import.meta.env.VITE_CTP_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
};

export const validateConfig = () => {
  if (
    !commercetoolsConfig.authUrl ||
    !commercetoolsConfig.projectKey ||
    !commercetoolsConfig.clientId ||
    !commercetoolsConfig.clientSecret
  ) {
    throw new Error('Missing Commercetools configuration');
  }
};
