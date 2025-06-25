export const commercetoolsConfig = {
  authUrl: import.meta.env.VITE_CTP_AUTH_URL,
  apiUrl: import.meta.env.VITE_CTP_API_URL,
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  clientId: import.meta.env.VITE_CTP_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  idCategoryHeadphones: import.meta.env.VITE_CTP_ID_CATEGORY_HEADPHONES,
  idCategoryVacuums: import.meta.env
    .VITE_CTP_ID_CATEGORY_VACUUMS_FLOOR_CLEANERS,
  idCategoryAirHeaters: import.meta.env.VITE_CTP_ID_CATEGORY_AIR_HEATERS,
  idCategoryHairBeauty: import.meta.env.VITE_CTP_ID_CATEGORY_HAIR_BEAUTY,
  idCategoryLighting: import.meta.env.VITE_CTP_ID_CATEGORY_LIGHTING,
};

export const validateConfig = () => {
  if (
    !commercetoolsConfig.authUrl ||
    !commercetoolsConfig.projectKey ||
    !commercetoolsConfig.clientId ||
    !commercetoolsConfig.clientSecret ||
    !commercetoolsConfig.idCategoryHeadphones ||
    !commercetoolsConfig.idCategoryVacuums ||
    !commercetoolsConfig.idCategoryAirHeaters ||
    !commercetoolsConfig.idCategoryHairBeauty ||
    !commercetoolsConfig.idCategoryLighting
  ) {
    throw new Error('Missing Commercetools configuration');
  }
};
