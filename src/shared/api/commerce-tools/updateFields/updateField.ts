import { Customer } from '@pages/profile/Profile';
import { commercetoolsConfig } from '../config';

interface UpdateCustomerData {
  version: number;
  actions: CustomerUpdateAction[];
}
interface CustomerUpdateAction {
  action: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export async function updateField(
  newValue: string,
  customerId: string,
  version: number,
  action: 'setFirstName' | 'setLastName' | 'setDateOfBirth'
): Promise<Customer | null> {
  const accessToken = localStorage.getItem('authDysonToken');

  if (!accessToken) {
    throw new Error('Authentication required');
  }

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/customers/${customerId}`;
  const updateData: UpdateCustomerData =
    action === 'setFirstName'
      ? {
          version,
          actions: [
            {
              action,
              firstName: newValue,
            },
          ],
        }
      : action === 'setLastName'
        ? {
            version,
            actions: [
              {
                action,
                lastName: newValue,
              },
            ],
          }
        : {
            version,
            actions: [
              {
                action,
                dateOfBirth: newValue,
              },
            ],
          };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authDysonToken');
    }
    throw new Error(response.status.toString());
  }

  return await response.json();
}
