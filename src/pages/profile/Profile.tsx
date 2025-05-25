import { IAddress } from '@components/common/forms/register-form/RegisterForm';
import { PersonalInfo } from '@components/layout/profile/PersonalInfo';
import { getCurrentCustomer } from '@shared/api/commerce-tools/getUserInfo';
import { useEffect, useState } from 'react';

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: IAddress[];
}

export const ProfilePage = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await getCurrentCustomer();
        setCustomer(customerData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>No customer data available</div>;

  return (
    <main>
      <div>
        <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
      </div>

      <PersonalInfo customer={customer} />

      <details>
        <summary>Raw customer data</summary>
        <pre>{JSON.stringify(customer, null, 2)}</pre>
      </details>
    </main>
  );
};
