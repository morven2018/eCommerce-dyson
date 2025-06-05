import {
  AddressForm,
  IAddressFormData,
} from '@components/common/forms/profile-forms/addUpdateAddresses';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Box,
  Chip,
  Dialog,
  DialogContent,
  Button,
} from '@mui/material';
import { ResponseAddress } from '@pages/profile/Profile';
import { removeAddress } from '@shared/api/commerce-tools/updateFields/updateAddresses/removeAddress';
import { DEFAULT_COUNTRIES } from '@shared/constants/countries';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import styles from '../../../components/layout/profile/profile.module.scss';
import { useForm } from 'react-hook-form';
import { updateAddress } from '@shared/api/commerce-tools/updateFields/updateAddresses/updateAddress';
import ShowDialog from '../modals/Modal';

interface AddressCardProps {
  address: ResponseAddress;
  isBilling?: boolean;
  isShipping?: boolean;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
  customerId?: string;
  customerVersion?: number;
  onAddressRemoved?: (params: {
    removedAddressId: string;
    newVersion: number;
  }) => void;
  onAddressUpdated?: (updatedData: {
    addressId: string;
    newVersion: number;
    updatedFields: IAddressFormData;
  }) => void;
}

export const AddressCard = ({
  address,
  isBilling = false,
  isShipping = false,
  isDefaultBilling = false,
  isDefaultShipping = false,
  customerId,
  customerVersion,
  onAddressRemoved,
  onAddressUpdated,
}: AddressCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [error, setError] = useState<{
    text: string;
    action?: () => void;
  } | null>(null);

  const { reset } = useForm();

  const handleDelete = async () => {
    if (!address.id || !customerId || !customerVersion) {
      setError({ text: 'No data to remove' });
      return;
    }

    setIsDeleting(true);

    try {
      if (isDefaultBilling || isDefaultShipping) {
        throw new Error('You cannot delete the default address');
      }

      const updatedCustomer = await removeAddress(
        address.id,
        customerId,
        customerVersion
      );
      onAddressRemoved?.({
        removedAddressId: address.id,
        newVersion: updatedCustomer?.version ?? customerVersion + 1,
      });
    } catch (err) {
      setError({
        text: err instanceof Error ? err.message : 'Error deleting address',
        action: () => setError(null),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getCountryName = (countryCode: string) => {
    const country = DEFAULT_COUNTRIES.find(
      (c) => c.code.toLowerCase() === countryCode.toLowerCase()
    );
    return country ? country.name : countryCode;
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSubmitAddress = async (formData: IAddressFormData) => {
    if (!customerId || !customerVersion) {
      setError({ text: 'Customer data missing' });
      return;
    }

    setIsUpdating(true);

    try {
      let addresstype: 'both' | 'billing' | 'shipping' | 'none' | undefined;
      if (formData.useAsBilling && formData.useAsShipping) addresstype = 'both';
      if (formData.useAsBilling && !formData.useAsShipping)
        addresstype = 'billing';
      if (!formData.useAsBilling && formData.useAsShipping)
        addresstype = 'shipping';
      if (!formData.useAsBilling && !formData.useAsShipping)
        addresstype = 'none';

      const updatedCustomer = await updateAddress(
        currentAddress.id,
        {
          country: formData.country,
          city: formData.city,
          street: formData.street,
          zipCode: formData.zipCode,
          streetLine2: formData.streetLine2,
        },
        customerId,
        customerVersion,
        {
          setAsDefaultBilling: formData.defaultBilling,
          setAsDefaultShipping: formData.defaultShipping,
        },
        addresstype
      );

      if (!updatedCustomer.addresses) throw new Error('No data to update');

      const updatedAddress = updatedCustomer.addresses.find(
        (a: ResponseAddress) => a.id === currentAddress.id
      );

      if (updatedAddress) {
        setCurrentAddress(updatedAddress);
        onAddressUpdated?.({
          addressId: updatedAddress.id,
          newVersion: updatedCustomer.version ?? 1,
          updatedFields: formData,
        });
      }

      setIsEditModalOpen(false);
    } catch (err) {
      setError({
        text: err instanceof Error ? err.message : 'Error updating address',
        action: () => setError(null),
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const initialFormValues: IAddressFormData = {
    id: address.id,
    country: address.country.toLowerCase(),
    city: address.city,
    street: address.streetName,
    zipCode: address.postalCode,
    useAsShipping: isShipping,
    useAsBilling: isBilling,
    defaultShipping: isDefaultShipping,
    defaultBilling: isDefaultBilling,
  };

  const handleCloseForm = () => {
    setIsEditModalOpen(false);
    reset();
  };

  return (
    <>
      <Box className={styles.card}>
        <div className={styles.removeArea}>
          <IconButton
            aria-label="Delete address"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
        <Box className={styles.chips}>
          {isDefaultBilling && (
            <Chip
              className={styles.chip}
              label="Default billing address"
              size="small"
            />
          )}
          {isDefaultShipping && (
            <Chip
              className={styles.chip}
              label="Default shipping address"
              size="small"
            />
          )}
          {isBilling && !isDefaultBilling && (
            <Chip label="Billing address" size="small" variant="outlined" />
          )}
          {isShipping && !isDefaultShipping && (
            <Chip label="Shipping address" size="small" variant="outlined" />
          )}
        </Box>
        <div className={styles.addressInfoOutput}>
          <p>
            <strong>County: </strong>
            {getCountryName(address.country.toLowerCase())}
          </p>
          <p>
            <strong>City:</strong> {address.city}
          </p>
          <p>
            <strong>Street:</strong> {address.streetName}
          </p>
          <p>
            <strong>Street line 2:</strong> {address.streetNumber ?? ''}
          </p>
          <p>
            <strong>Zip code:</strong> {address.postalCode}
          </p>
        </div>

        <Button
          variant="text"
          size="small"
          onClick={handleEditClick}
          disabled={isDeleting ?? isUpdating}
          className={styles.cardButton}
        >
          Update
        </Button>
      </Box>

      <Dialog
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
      >
        <div className={styles.closeButton}>
          <IconButton aria-label="close" onClick={handleCloseForm}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <AddressForm
            initialValues={initialFormValues}
            onSubmit={handleSubmitAddress}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>

      {error && (
        <ShowDialog message={error.text} onClose={() => setError(null)} />
      )}
    </>
  );
};
