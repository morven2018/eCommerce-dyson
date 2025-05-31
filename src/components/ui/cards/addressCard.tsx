import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Box, Typography, Chip, Alert } from '@mui/material';
import { ResponseAddress } from '@pages/profile/Profile';
import { removeAddress } from '@shared/api/commerce-tools/updateFields/updateAddresses/removeAdderss';

import { useState } from 'react';

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
}: AddressCardProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!address.id || !customerId || !customerVersion) {
      setError('Недостаточно данных для удаления');
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      if (isDefaultBilling || isDefaultShipping) {
        throw new Error('Нельзя удалить адрес, используемый по умолчанию');
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
      setError(
        err instanceof Error ? err.message : 'Ошибка при удалении адреса'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
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
        aria-label="Удалить адрес"
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
        {isDefaultBilling && (
          <Chip label="Default billing address" size="small" color="primary" />
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
        {address.country}
      </Typography>
    </Box>
  );
};
