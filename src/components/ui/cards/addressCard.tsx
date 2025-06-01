import {
  AddressForm,
  IAddressFormData,
} from '@components/common/forms/profile-forms/addUpdateAddresses';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Box,
  Typography,
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
        newVersion: updatedCustomer?.version || customerVersion + 1,
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
        formData.useAsBilling && formData.useAsShipping
          ? 'both'
          : formData.useAsBilling
            ? 'billing'
            : formData.useAsShipping
              ? 'shipping'
              : 'none'
      );

      if (!updatedCustomer.addresses) throw new Error('No data to update');

      const updatedAddress = updatedCustomer.addresses.find(
        (a: ResponseAddress) => a.id === currentAddress.id
      );

      if (updatedAddress) {
        setCurrentAddress(updatedAddress);
        onAddressUpdated?.({
          addressId: updatedAddress.id,
          newVersion: updatedCustomer.version || 1,
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
      <Box
        sx={{
          p: 3,
          mb: 2,
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          position: 'relative',
          opacity: isDeleting ? 0.7 : 1,
        }}
      >
        <IconButton
          aria-label="Delete address"
          onClick={handleDelete}
          disabled={isDeleting}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'error.main',
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>

        <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
          {isDefaultBilling && (
            <Chip
              label="Default billing address"
              size="small"
              color="primary"
            />
          )}
          {isDefaultShipping && (
            <Chip
              label="Default shipping address"
              size="small"
              color="secondary"
            />
          )}
          {isBilling && !isDefaultBilling && (
            <Chip label="Billing address" size="small" variant="outlined" />
          )}
          {isShipping && !isDefaultShipping && (
            <Chip label="Shipping address" size="small" variant="outlined" />
          )}
        </Box>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {address.streetName}{' '}
          {address.streetNumber ? `, ${address.streetNumber}` : ''}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {address.city}, {address.postalCode}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {getCountryName(address.country.toLowerCase())}
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={handleEditClick}
          disabled={isDeleting || isUpdating}
          sx={{ color: 'primary.main', textTransform: 'none' }}
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
