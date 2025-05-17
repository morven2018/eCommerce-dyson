import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  useForm,
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputEmail from '../../../ui/inputs/InputEmail';
import InputPassword from '../../../ui/inputs/InputPassword';
import { InputText } from '../../../ui/inputs/inputText';
import '../../../../pages/auth/register/Register.module.scss';
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

const steps = ['Contact Information', 'Shipping Address', 'Billing Address'];

export interface IFormData {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  dayOfBirth: Date;
  shippingAddress: {
    defaultAddress?: boolean;
    country: string;
    city: string;
    street: string;
    streetLine2?: string;
    zipCode: string;
  };
  billingAddress: {
    dataFromShipping?: boolean;
    defaultAddress?: boolean;
    country: string;
    city: string;
    street: string;
    streetLine2?: string;
    zipCode: string;
  };
}

interface BaseStepProps {
  control: Control<IFormData>;
  errors: FieldErrors<IFormData>;
  isValid: boolean;
}

interface Step1Props extends BaseStepProps {
  setValue: UseFormSetValue<IFormData>;
  onNext: () => Promise<void>;
}

interface Step2Props extends BaseStepProps {
  onNext: () => Promise<void>;
  onPrev: () => void;
}

interface Step3Props extends BaseStepProps {
  onPrev: () => void;
  setValue: UseFormSetValue<IFormData>;
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

type ContactField =
  | 'email'
  | 'password'
  | 'phone'
  | 'firstName'
  | 'lastName'
  | 'dayOfBirth';
type ShippingField =
  `shippingAddress.${'country' | 'city' | 'street' | 'streetLine2' | 'zipCode' | 'defaultAddress'}`;
type BillingField =
  `billingAddress.${'country' | 'city' | 'street' | 'streetLine2' | 'zipCode' | 'defaultAddress' | 'dataFromShipping'}`;

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
  'shippingAddress.zipCode',
];
const billingFields: BillingField[] = [
  'billingAddress.country',
  'billingAddress.city',
  'billingAddress.street',
  'billingAddress.zipCode',
];

function isContactField(field: string): field is ContactField {
  return contactFields.some((validField) => validField === field);
}

function isShippingField(field: string): field is ShippingField {
  return shippingFields.some((validField) => validField === field);
}

function isBillingField(field: string): field is BillingField {
  return billingFields.some((validField) => validField === field);
}

const Step1 = ({ control, errors, setValue, onNext, isValid }: Step1Props) => {
  return (
    <div className={styles.form}>
      <h5>Contact Information</h5>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputEmail
            value={field.value}
            onChange={field.onChange}
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
              onChange={field.onChange}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          onClick={() =>
            setValue('password', generatePassword(), {
              shouldValidate: false,
            })
          }
          variant="outlined"
          className={styles.button}
        >
          generate
        </Button>
      </div>

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputPhone
            value={field.value}
            onChange={field.onChange}
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
            onChange={field.onChange}
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
            onChange={field.onChange}
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
              field.onChange(date?.toDate() ?? null);
            }}
            onBlur={field.onBlur}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button
        className={styles.button}
        variant="contained"
        onClick={onNext}
        style={{ marginTop: '20px' }}
        disabled={!isValid}
      >
        Next
      </Button>
    </div>
  );
};

const Step2 = ({ control, errors, onNext, onPrev, isValid }: Step2Props) => {
  return (
    <div className={styles.form}>
      <h5>Shipping Information</h5>

      <Controller
        name="shippingAddress.defaultAddress"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value ?? false}
                onChange={(e) => field.onChange(e.target.checked)}
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
        name="shippingAddress.city"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="city-billing"
            label="City"
            value={field.value}
            onChange={field.onChange}
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
            onChange={field.onChange}
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
            onChange={field.onChange}
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
            onChange={field.onChange}
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
          disabled={!isValid}
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

  const handleCopyChange = (checked: boolean) => {
    setCopyFromShipping(checked);

    if (checked) {
      setValue(
        'billingAddress.country',
        formValues.shippingAddress?.country ?? ''
      );
      setValue('billingAddress.city', formValues.shippingAddress?.city ?? '');
      setValue(
        'billingAddress.street',
        formValues.shippingAddress?.street ?? ''
      );
      setValue(
        'billingAddress.streetLine2',
        formValues.shippingAddress?.streetLine2 ?? ''
      );
      setValue(
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
            control={
              <Checkbox
                checked={field.value ?? false}
                onChange={(e) => field.onChange(e.target.checked)}
                color="primary"
              />
            }
            label="Set as default address"
          />
        )}
      />

      <CountrySelect
        control={control}
        name="billingAddress.country"
        label="Country"
        error={errors.billingAddress?.country}
      />

      <Controller
        name="billingAddress.city"
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
        name="billingAddress.street"
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id="street"
            label="Street Address"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
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
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
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
            onChange={field.onChange}
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
          type="submit"
          variant="contained"
          style={{ marginTop: '20px' }}
          disabled={!isValid}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [step1Valid, setStep1Valid] = useState(false);
  const [step2Valid, setStep2Valid] = useState(false);
  const [step3Valid, setStep3Valid] = useState(false);
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

  const contactFields = useMemo<ContactField[]>(
    () => ['email', 'password', 'phone', 'firstName', 'lastName', 'dayOfBirth'],
    []
  );

  const shippingFields = useMemo<ShippingField[]>(
    () => [
      'shippingAddress.country',
      'shippingAddress.city',
      'shippingAddress.street',
      'shippingAddress.zipCode',
    ],
    []
  );

  const billingFields = useMemo<BillingField[]>(
    () => [
      'billingAddress.country',
      'billingAddress.city',
      'billingAddress.street',
      'billingAddress.zipCode',
    ],
    []
  );

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (activeStep === 0 && name && isContactField(name)) {
        trigger(contactFields).then((isValid) => setStep1Valid(isValid));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, activeStep, trigger, contactFields]);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (activeStep === 1 && name && isShippingField(name)) {
        trigger(shippingFields).then((isValid) => setStep2Valid(isValid));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, activeStep, trigger, shippingFields]);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (activeStep === 2 && name && isBillingField(name)) {
        trigger(billingFields).then((isValid) => setStep3Valid(isValid));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, activeStep, trigger, billingFields]);

  const nextStep = async () => {
    let isStepValid = false;
    switch (activeStep) {
      case 0:
        isStepValid = await trigger(contactFields);
        setStep1Valid(isStepValid);
        break;
      case 1:
        isStepValid = await trigger(shippingFields);
        setStep2Valid(isStepValid);
        if (isStepValid) {
          setValue('billingAddress', {
            country: '',
            city: '',
            street: '',
            streetLine2: '',
            zipCode: '',
            dataFromShipping: false,
            defaultAddress: false,
          });
        }
        break;
      case 2:
        isStepValid = await trigger(billingFields);
        setStep3Valid(isStepValid);
        break;
    }

    if (isStepValid) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = async (data: IFormData) => {
    try {
      await register(data);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Registration failed'
      );
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Step1
            control={control}
            errors={errors}
            setValue={setValue}
            onNext={nextStep}
            isValid={step1Valid}
          />
        );
      case 1:
        return (
          <Step2
            control={control}
            errors={errors}
            onNext={nextStep}
            onPrev={prevStep}
            isValid={step2Valid}
          />
        );
      case 2:
        return (
          <Step3
            control={control}
            errors={errors}
            onPrev={prevStep}
            isValid={step3Valid}
            setValue={setValue}
          />
        );
      default:
        return null;
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
        }}
        className={styles.stepper}
      >
        {steps.map((label) => (
          <Step key={label} className={styles.stepItem}>
            <StepLabel className={styles.stepLabel}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStep()}
      {errorMessage && <ShowDialog message={errorMessage} />}
    </Box>
  );
};
