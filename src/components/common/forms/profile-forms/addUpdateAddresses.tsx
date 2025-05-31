import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  textValidationSchema,
  textValidationSchema2,
  zipCodeValidationSchema,
} from '@shared/lib/validator/validator';
import { CountrySelect } from '../../../ui/inputs/selectCountry';
import { InputText } from '../../../ui/inputs/inputText';
import { AddAddressOptions } from '@shared/api/commerce-tools/updateFields/updateAddresses/addAddreses';

export interface IAddressFormData {
  id?: string;
  country: string;
  city: string;
  street: string;
  streetLine2?: string;
  zipCode: string;
  useAsShipping: boolean;
  useAsBilling: boolean;
  defaultShipping: boolean;
  defaultBilling: boolean;
}

const addressSchema = yup.object().shape({
  country: yup.string().required('This field is mandatory'),
  city: textValidationSchema,
  street: textValidationSchema2,
  zipCode: zipCodeValidationSchema,
  useAsShipping: yup.boolean().default(false),
  useAsBilling: yup.boolean().default(false),
  defaultShipping: yup.boolean().default(false),
  defaultBilling: yup.boolean().default(false),
});

interface AddressFormProps {
  initialValues?: Partial<IAddressFormData>;
  onSubmit: (data: IAddressFormData) => void;
  onCancel?: () => void;
  isEditing?: boolean;
  initialOptions?: AddAddressOptions;
  initialAddressType?: 'billing' | 'shipping' | 'both';
}

export const AddressForm = ({
  initialValues,
  onSubmit,
  isEditing = false,
}: AddressFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useForm<IAddressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      ...{
        useAsShipping: false,
        useAsBilling: false,
        defaultShipping: false,
        defaultBilling: false,
      },
      ...initialValues,
    },
    mode: 'onChange',
  });

  const [useAsShipping, useAsBilling, defaultShipping, defaultBilling] = watch([
    'useAsShipping',
    'useAsBilling',
    'defaultShipping',
    'defaultBilling',
  ]);

  const handleDefaultShippingChange = (checked: boolean) => {
    setValue('defaultShipping', checked);
    if (checked && !useAsShipping) {
      setValue('useAsShipping', true);
    }
  };

  const handleDefaultBillingChange = (checked: boolean) => {
    setValue('defaultBilling', checked);
    if (checked && !useAsBilling) {
      setValue('useAsBilling', true);
    }
  };

  const handleUseAsShippingChange = (checked: boolean) => {
    setValue('useAsShipping', checked);
    if (!checked && defaultShipping) {
      setValue('defaultShipping', false);
    }
    if (!checked && !useAsBilling) {
      setValue('useAsBilling', true);
    }
  };

  const handleUseAsBillingChange = (checked: boolean) => {
    setValue('useAsBilling', checked);
    if (!checked && defaultBilling) {
      setValue('defaultBilling', false);
    }
    if (!checked && !useAsShipping) {
      setValue('useAsShipping', true);
    }
  };

  return (
    <Box
      component="form"
      className={'addressForm'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Address' : 'Add New Address'}
      </Typography>

      <Controller
        name="useAsShipping"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => handleUseAsShippingChange(e.target.checked)}
                color="primary"
              />
            }
            label="Use as Shipping Address"
          />
        )}
      />

      <Controller
        name="useAsBilling"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => handleUseAsBillingChange(e.target.checked)}
                color="primary"
              />
            }
            label="Use as Billing Address"
          />
        )}
      />

      <Controller
        name="defaultShipping"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => handleDefaultShippingChange(e.target.checked)}
                color="primary"
                disabled={!useAsShipping}
              />
            }
            label="Set as Default Shipping Address"
          />
        )}
      />

      <Controller
        name="defaultBilling"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => handleDefaultBillingChange(e.target.checked)}
                color="primary"
                disabled={!useAsBilling}
              />
            }
            label="Set as Default Billing Address"
          />
        )}
      />

      <CountrySelect<IAddressFormData>
        control={control}
        name="country"
        label="Country"
        error={errors.country}
        onChange={(value) => {
          setValue('country', value, { shouldValidate: true });
        }}
      />

      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="city"
            label="City"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="street"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="street"
            label="Street"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="streetLine2"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="streetLine2"
            label="Street Address Line 2"
            value={field.value || ''}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="zipCode"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="zipCode"
            label="Zip Code"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid || !isDirty}
      >
        {isEditing ? 'Update Address' : 'Add Address'}
      </Button>
    </Box>
  );
};
