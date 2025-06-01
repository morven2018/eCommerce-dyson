import { PersonalInfo } from '@components/layout/profile/PersonalInfo';
import { getCurrentCustomer } from '@shared/api/commerce-tools/getUserInfo';
import { useEffect, useState } from 'react';
import styles from '../../components/layout/profile/profile.module.scss';
import { AddressInfo } from '@components/layout/profile/AddressInfo';

export interface Customer {
  id: string;
  version?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  password?: string;
  addresses?: ResponseAddress[];
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  custom?: {
    fields: {
      phone: string;
    };
  };
}
export interface ResponseAddress {
  id: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber?: string;
  postalCode: string;
}

export const ProfilePage = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSave = (updatedData: Partial<Customer>) => {
    if (customer) {
      setCustomer({
        ...customer,
        ...updatedData,
      });
    }
  };

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
      <div className={styles.header}>
        <h2>{`${customer.firstName ?? ''} ${customer.lastName ?? ''}`}</h2>
      </div>
      <PersonalInfo customer={customer} onSave={handleSave} />
      <AddressInfo customer={customer} onSave={handleSave} />
    </main>
  );
};
