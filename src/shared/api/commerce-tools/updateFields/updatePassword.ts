import { Customer } from '@pages/profile/Profile';
import { commercetoolsConfig } from '../config';

interface UpdateCustomerData {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}

export async function updatePassword(
  newPassword: string,
  currentPassword: string,
  customerId: string,
  version: number
): Promise<Customer | null> {
  const accessToken = localStorage.getItem('authDysonToken');

  if (!accessToken) {
    throw new Error('Authentication required');
  }

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/customers/password`;

  const updateData: UpdateCustomerData = {
    id: customerId,
    version,
    currentPassword,
    newPassword,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      if (response.status === 401) {
        localStorage.removeItem('authDysonToken');
      }
      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating customer password', error);
    return null;
  }
}
