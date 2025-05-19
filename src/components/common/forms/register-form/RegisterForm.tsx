import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  useForm,
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
  useWatch,
  Path,
  PathValue,
} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputEmail from '../../../ui/inputs/InputEmail';
import InputPassword from '../../../ui/inputs/InputPassword';
import { InputText } from '../../../ui/inputs/inputText';
import {
  birthValidationSchema,
  emailValidationSchema,
  passwordValidationSchema,
  phoneValidationSchema,
  textValidationSchema,
  textValidationSchema2,
  zipCodeValidationSchema,
} from '../../../../shared/lib/validator/validator';
import generatePassword from '../../../../shared/utlis/password-generator';
import InputPhone from '../../../ui/inputs/inputPhone';
import InputDate from '../../../ui/inputs/datePicker';
import dayjs from 'dayjs';
import { CountrySelect } from '../../../ui/inputs/selectCountry';
import styles from './RegisterForm.module.scss';
import { register } from '../../../../shared/api/commerce-tools/newCustomer';
import ShowDialog from '../../../ui/modals/Modal';
import { userAuthorization } from '../../../../shared/api/commerce-tools/authorization';

const steps = ['Contact Information', 'Shipping Address', 'Billing Address'];

export interface IFormData {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  dayOfBirth: Date;
  shippingAddress: IAddress;
  billingAddress: IAddress;
}

interface IAddress {
  dataFromShipping?: boolean;
  defaultAddress?: boolean;
  country: string;
  city: string;
  street: string;
  streetLine2?: string;
  zipCode: string;
}

interface BaseStepProps {
  control: Control<IFormData>;
  errors: FieldErrors<IFormData>;
  isValid: boolean;
}

interface Step1Props extends BaseStepProps {
  setValue: UseFormSetValue<IFormData>;
  onNext: () => void;
}

interface Step2Props extends BaseStepProps {
  onNext: () => void;
  onPrev: () => void;
  setValue: UseFormSetValue<IFormData>;
  trigger: (fields?: Path<IFormData>[]) => Promise<boolean>;
}

interface Step3Props extends BaseStepProps {
  onPrev: () => void;
  setValue: UseFormSetValue<IFormData>;
  trigger: (fields?: Path<IFormData>[]) => Promise<boolean>;
}

const addressSchema = yup.object().shape({
  dataFromShipping: yup.boolean().optional(),
  defaultAddress: yup.boolean().optional(),
  country: yup.string().required('This field is mandatory'),
  city: textValidationSchema,
  street: textValidationSchema2,
  streetLine2: yup.string().optional(),
  zipCode: zipCodeValidationSchema,
});

const formSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  phone: phoneValidationSchema,
  firstName: textValidationSchema,
  lastName: textValidationSchema,
  dayOfBirth: birthValidationSchema,
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

type ContactField = Path<
  Pick<
    IFormData,
    'email' | 'password' | 'phone' | 'firstName' | 'lastName' | 'dayOfBirth'
  >
>;
type ShippingField = Path<{ shippingAddress: IFormData['shippingAddress'] }>;
type BillingField = Path<{ billingAddress: IFormData['billingAddress'] }>;

const contactFields: ContactField[] = [
  'email',
  'password',
  'phone',
  'firstName',
  'lastName',
  'dayOfBirth',
];

const shippingFields: ShippingField[] = [
  'shippingAddress.country',
  'shippingAddress.city',
  'shippingAddress.street',
  'shippingAddress.streetLine2',
  'shippingAddress.zipCode',
  'shippingAddress.defaultAddress',
];

const billingFields: BillingField[] = [
  'billingAddress.country',
  'billingAddress.city',
  'billingAddress.street',
  'billingAddress.streetLine2',
  'billingAddress.zipCode',
  'billingAddress.defaultAddress',
  'billingAddress.dataFromShipping',
];

const Step1 = ({ control, errors, setValue, onNext, isValid }: Step1Props) => {
  const handleFieldChange = (
    fieldName: Path<IFormData>,
    value: string | boolean | Date
  ) => {
    setValue(fieldName, value, { shouldValidate: true });
  };

  const allFieldsFilled = useWatch({
    control,
    name: ['email', 'password', 'phone', 'firstName', 'lastName', 'dayOfBirth'],
  }).every((field) => !!field);

  return (
    <div className={styles.form}>
      <h5>Contact Information</h5>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputEmail
            value={field.value}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <div className={styles.password}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputPassword
              value={field.value}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          onClick={() => {
            const newPassword = generatePassword();
            handleFieldChange('password', newPassword);
          }}
          variant="outlined"
          className={styles.button}
        >
          Generate
        </Button>
      </div>

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputPhone
            value={field.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              field.onChange(value);
              setValue('phone', value, { shouldValidate: true });
            }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />

      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="first-name"
            label="First name"
            value={field.value}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="last-name"
            label="Last name"
            value={field.value}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="dayOfBirth"
        control={control}
        render={({ field, fieldState }) => (
          <InputDate
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              if (date) {
                const dateValue = date.toDate();
                field.onChange(dateValue);
                setValue('dayOfBirth', dateValue, { shouldValidate: true });
              }
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Button
        className={styles.button}
        variant="contained"
        onClick={onNext}
        disabled={!isValid || !allFieldsFilled}
        style={{ marginTop: '20px' }}
      >
        Next
      </Button>

      <p className={styles.text}>
        Already registered? <Link to="/login">Click here</Link>
      </p>
    </div>
  );
};

const Step2 = ({
  control,
  errors,
  onNext,
  onPrev,
  isValid,
  setValue,
  trigger,
}: Step2Props) => {
  const handleFieldChange = <T extends ShippingField>(
    fieldName: T,
    value: PathValue<IFormData, T>
  ) => {
    setValue(fieldName, value, { shouldValidate: true });

    if (fieldName === 'shippingAddress.country') {
      trigger([
        'shippingAddress.country',
        'shippingAddress.city',
        'shippingAddress.street',
        'shippingAddress.zipCode',
      ]);
    }
  };

  const shippingFieldsFilled = useWatch({
    control,
    name: [
      'shippingAddress.country',
      'shippingAddress.city',
      'shippingAddress.street',
      'shippingAddress.zipCode',
    ],
  }).every((field) => !!field);

  return (
    <div className={styles.form}>
      <h5>Shipping Information</h5>

      <Controller
        name="shippingAddress.defaultAddress"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className={styles.checkbox}
            control={
              <Checkbox
                checked={field.value ?? false}
                onChange={(e) =>
                  handleFieldChange(
                    'shippingAddress.defaultAddress',
                    e.target.checked
                  )
                }
                color="primary"
              />
            }
            label="Set as default address"
          />
        )}
      />

      <CountrySelect
        control={control}
        name="shippingAddress.country"
        label="Country"
        error={errors.shippingAddress?.country}
        onChange={(value: string) => {
          handleFieldChange('shippingAddress.country', value);
        }}
      />

      <Controller
        name="shippingAddress.city"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="city-billing"
            label="City"
            value={field.value}
            onChange={(e) =>
              handleFieldChange('shippingAddress.city', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="shippingAddress.street"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="street-billing"
            label="Street Address"
            value={field.value}
            onChange={(e) =>
              handleFieldChange('shippingAddress.street', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="shippingAddress.streetLine2"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="streetLine2"
            label="Street Address Line 2"
            value={field.value ?? ''}
            onChange={(e) =>
              handleFieldChange('shippingAddress.streetLine2', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="shippingAddress.zipCode"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="zipCode-billing"
            label="Zip code"
            value={field.value}
            onChange={(e) =>
              handleFieldChange('shippingAddress.zipCode', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <div className={styles.buttonBox}>
        <Button
          className={styles.button}
          variant="contained"
          onClick={onPrev}
          style={{ marginTop: '20px' }}
        >
          Previous
        </Button>

        <Button
          className={styles.button}
          variant="contained"
          onClick={onNext}
          style={{ marginTop: '20px' }}
          disabled={!isValid || !shippingFieldsFilled}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Step3 = ({ control, errors, onPrev, isValid, setValue }: Step3Props) => {
  const formValues = useWatch({ control });
  const [copyFromShipping, setCopyFromShipping] = useState(false);

  type AddressType = {
    dataFromShipping?: boolean;
    defaultAddress?: boolean;
    country: string;
    city: string;
    street: string;
    streetLine2?: string;
    zipCode: string;
  };

  const billingFieldsFilled =
    useWatch({
      control,
      name: [
        'billingAddress.country',
        'billingAddress.city',
        'billingAddress.street',
        'billingAddress.zipCode',
      ],
    }).every((field) => !!field) || copyFromShipping;

  const handleFieldChange = (
    fieldName: BillingField,
    value: string | boolean | AddressType
  ) => {
    setValue(fieldName, value, { shouldValidate: true });
  };

  const handleCopyChange = (checked: boolean) => {
    setCopyFromShipping(checked);
    handleFieldChange('billingAddress.dataFromShipping', checked);

    if (checked) {
      handleFieldChange(
        'billingAddress.country',
        formValues.shippingAddress?.country ?? ''
      );
      handleFieldChange(
        'billingAddress.city',
        formValues.shippingAddress?.city ?? ''
      );
      handleFieldChange(
        'billingAddress.street',
        formValues.shippingAddress?.street ?? ''
      );
      handleFieldChange(
        'billingAddress.streetLine2',
        formValues.shippingAddress?.streetLine2 ?? ''
      );
      handleFieldChange(
        'billingAddress.zipCode',
        formValues.shippingAddress?.zipCode ?? ''
      );
    }
  };

  return (
    <div className={styles.form}>
      <h5>Billing address</h5>

      <FormControlLabel
        control={
          <Checkbox
            className={styles.checkbox}
            checked={copyFromShipping}
            onChange={(e) => handleCopyChange(e.target.checked)}
            color="primary"
          />
        }
        label="Use data from shipping address"
      />

      <Controller
        name="billingAddress.defaultAddress"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className={styles.checkbox}
            control={
              <Checkbox
                checked={field.value ?? false}
                onChange={(e) =>
                  handleFieldChange(
                    'billingAddress.defaultAddress',
                    e.target.checked
                  )
                }
                color="primary"
              />
            }
            label="Set as default address"
          />
        )}
      />

      <CountrySelect
        control={control}
        name="shippingAddress.country"
        label="Country"
        error={errors.shippingAddress?.country}
      />

      <Controller
        name="billingAddress.city"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="city"
            label="City"
            value={field.value}
            onChange={(e) =>
              handleFieldChange('billingAddress.city', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={copyFromShipping}
          />
        )}
      />

      <Controller
        name="billingAddress.street"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="street"
            label="Street Address"
            value={field.value}
            onChange={(e) =>
              handleFieldChange('billingAddress.street', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={copyFromShipping}
          />
        )}
      />

      <Controller
        name="billingAddress.streetLine2"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="streetLine2"
            label="Street Address Line 2"
            value={field.value ?? ''}
            onChange={(e) =>
              handleFieldChange('billingAddress.streetLine2', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={copyFromShipping}
          />
        )}
      />

      <Controller
        name="billingAddress.zipCode"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="zipCode"
            label="Zip code"
            value={field.value}
            onChange={(e) =>
              handleFieldChange('billingAddress.zipCode', e.target.value)
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={copyFromShipping}
          />
        )}
      />

      <div className={styles.buttonBox}>
        <Button
          className={styles.button}
          variant="contained"
          onClick={onPrev}
          style={{ marginTop: '20px' }}
        >
          Previous
        </Button>

        <Button
          className={styles.button}
          type="submit"
          variant="contained"
          style={{ marginTop: '20px' }}
          disabled={!isValid || (!copyFromShipping && !billingFieldsFilled)}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [stepsValidity, setStepsValidity] = useState([false, false, false]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<IFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      phone: '',
      firstName: '',
      lastName: '',
      dayOfBirth: new Date(),
      shippingAddress: {
        defaultAddress: false,
        country: '',
        city: '',
        street: '',
        streetLine2: '',
        zipCode: '',
      },
      billingAddress: {
        dataFromShipping: false,
        defaultAddress: false,
        country: '',
        city: '',
        street: '',
        streetLine2: '',
        zipCode: '',
      },
    },
  });

  const updateStepValidity = async (
    stepIndex: number,
    fieldName?: Path<IFormData>
  ) => {
    let fields: Path<IFormData>[] = [];
    if (fieldName) {
      fields = [fieldName];
    } else {
      switch (stepIndex) {
        case 0:
          fields = contactFields;
          break;
        case 1:
          fields = shippingFields;
          break;
        case 2:
          fields = billingFields;
          break;
        default:
          return;
      }
    }

    const isValid = await trigger(fields);
    setStepsValidity((prev) => {
      const newValidity = [...prev];
      newValidity[stepIndex] = isValid;
      return newValidity;
    });
  };

  const debouncedUpdateStepValidity = debounce<
    [number, Path<IFormData> | undefined]
  >(updateStepValidity, 300);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name) {
        let stepIndex = -1;
        if (contactFields.includes(name as ContactField)) stepIndex = 0;
        else if (shippingFields.includes(name as ShippingField)) stepIndex = 1;
        else if (billingFields.includes(name as BillingField)) stepIndex = 2;

        if (stepIndex >= 0) {
          debouncedUpdateStepValidity(stepIndex, name as Path<IFormData>);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, activeStep, debouncedUpdateStepValidity]);

  const nextStep = async () => {
    const fieldsToValidate =
      activeStep === 0
        ? contactFields
        : activeStep === 1
          ? shippingFields
          : billingFields;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = async (data: IFormData) => {
    try {
      const result = await register(data);
      if (result) {
        const authResponse = await userAuthorization(
          result.authData,
          'Your account has been successfully created'
        );
        if (authResponse) navigate('/');
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Registration failed'
      );
    }
  };

  return (
    <Box
      component="form"
      className={styles.registerForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stepper
        activeStep={activeStep}
        sx={{
          '& .Mui-active .MuiStepIcon-root circle': {
            fill: '#192a51',
          },
          '& .Mui-completed': {
            '& .MuiSvgIcon-root': {
              '& path:first-of-type': {
                fill: '#192a51',
              },
            },
          },
          '@media (max-width: 700px)': {
            '& .MuiStepLabel-labelContainer': {
              display: 'none',
            },
          },
        }}
        className={styles.stepper}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Step1
          control={control}
          errors={errors}
          setValue={setValue}
          onNext={nextStep}
          isValid={stepsValidity[0]}
        />
      )}

      {activeStep === 1 && (
        <Step2
          control={control}
          errors={errors}
          onNext={nextStep}
          onPrev={prevStep}
          isValid={stepsValidity[1]}
          setValue={setValue}
          trigger={trigger}
        />
      )}

      {activeStep === 2 && (
        <Step3
          control={control}
          errors={errors}
          onPrev={prevStep}
          isValid={stepsValidity[2]}
          setValue={setValue}
          trigger={trigger}
        />
      )}

      {errorMessage && (
        <ShowDialog
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </Box>
  );
};
