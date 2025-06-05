import { Customer, ResponseAddress } from '@pages/profile/Profile';
import styles from './profile.module.scss';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { AddressCard } from '@components/ui/cards/AddressCard';
import { useEffect, useState } from 'react';
import {
  AddressForm,
  IAddressFormData,
} from '@components/common/forms/profile-forms/addUpdateAddresses';
import CloseIcon from '@mui/icons-material/Close';
import { addAddress } from '@shared/api/commerce-tools/updateFields/updateAddresses/addAddresses';
import ShowDialog from '@components/ui/modals/Modal';

interface AddressRemovedParams {
  removedAddressId: string;
  newVersion: number;
}

interface PersonalInfoProps {
  customer: Customer & {
    addresses?: ResponseAddress[];
    billingAddressIdList?: string[];
    shippingAddressIds?: string[];
    defaultBillingAddressId?: string;
    defaultShippingAddressId?: string;
  };
  onSave?: (updatedData: Partial<Customer>) => void;
}

export const AddressInfo = ({ customer, onSave }: PersonalInfoProps) => {
  const [addresses, setAddresses] = useState<ResponseAddress[]>(
    customer.addresses ?? []
  );
  const [error, setError] = useState<{
    text: string;
    action?: () => void;
  } | null>(null);

  useEffect(() => {
    setAddresses(customer.addresses ?? []);
  }, [customer.addresses]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddressRemoved = ({
    removedAddressId,
    newVersion,
  }: AddressRemovedParams) => {
    const updatedAddresses = addresses.filter(
      (addr) => addr.id !== removedAddressId
    );
    setAddresses(updatedAddresses);
    onSave?.({
      ...customer,
      addresses: updatedAddresses,
      version: newVersion,
    });
  };

  const determineAddressType = (
    useAsBilling: boolean,
    useAsShipping: boolean
  ): 'both' | 'billing' | 'shipping' | 'none' => {
    if (useAsBilling && useAsShipping) return 'both';
    if (useAsBilling) return 'billing';
    if (useAsShipping) return 'shipping';
    return 'none';
  };

  const handleAddAddress = async (addressData: IAddressFormData) => {
    const addressType = determineAddressType(
      addressData.useAsBilling,
      addressData.useAsShipping
    );

    const options = {
      setAsDefaultBilling: addressData.defaultBilling,
      setAsDefaultShipping: addressData.defaultShipping,
    };
    setIsSubmitting(true);
    try {
      const response = await addAddress(
        addressData,
        customer.id,
        customer.version ?? 1,
        options,
        addressType
      );

      if (response?.addresses) {
        onSave?.({
          ...customer,
          addresses: response.addresses,
          billingAddressIdList: response.billingAddressIdList,
          shippingAddressIds: response.shippingAddressIds,
          defaultBillingAddressId: response.defaultBillingAddressId,
          defaultShippingAddressId: response.defaultShippingAddressId,
          version: response.version,
        });
        setIsDialogOpen(false);
      }
    } catch {
      setError({
        text: 'Failed to add address',
        action: () => setError(null),
      });
    } finally {
      setIsDialogOpen(false);
      setIsSubmitting(false);
    }
  };

  const handleAddressUpdated = ({
    addressId,
    newVersion,
    updatedFields,
  }: {
    addressId: string;
    newVersion: number;
    updatedFields: IAddressFormData;
  }) => {
    const updatedAddresses = addresses.map((addr) => {
      if (addr.id === addressId) {
        return {
          ...addr,
          country: updatedFields.country,
          city: updatedFields.city,
          streetName: updatedFields.street,
          postalCode: updatedFields.zipCode,
        };
      }
      return addr;
    });

    setAddresses(updatedAddresses);
    onSave?.({
      ...customer,
      addresses: updatedAddresses,
      version: newVersion,
      defaultBillingAddressId: updatedFields.defaultBilling
        ? addressId
        : customer.defaultBillingAddressId,
      defaultShippingAddressId: updatedFields.defaultShipping
        ? addressId
        : customer.defaultShippingAddressId,
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={styles.addressInfo}>
      <div className={styles.infoHeader}>
        <h3>Addresses</h3>
        <Button
          variant="contained"
          onClick={() => setIsDialogOpen(true)}
          disabled={isSubmitting}
          className={styles.button}
        >
          Add address
        </Button>
      </div>
      {addresses.length === 0 ? (
        <p className={styles.text}>No saved addresses</p>
      ) : (
        <div className={styles.addresses}>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isBilling={customer.billingAddressIdList?.includes(address.id)}
              isShipping={customer.shippingAddressIds?.includes(address.id)}
              isDefaultBilling={address.id === customer.defaultBillingAddressId}
              isDefaultShipping={
                address.id === customer.defaultShippingAddressId
              }
              customerId={customer.id}
              customerVersion={customer.version}
              onAddressRemoved={handleAddressRemoved}
              onAddressUpdated={handleAddressUpdated}
            />
          ))}
        </div>
      )}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <div className={styles.addressForm}>
          <div className={styles.closeButton}>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              disabled={isSubmitting}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent className={styles.formContent}>
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </div>
      </Dialog>
      {error && (
        <ShowDialog message={error.text} onClose={() => setError(null)} />
      )}{' '}
    </div>
  );
};
