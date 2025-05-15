import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  useForm,
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
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
} from '../../../../shared/lib/validator/validator';
import generatePassword from '../../../../shared/utlis/password-generator';
import InputPhone from '../../../ui/inputs/inputPhone';
import InputDate from '../../../ui/inputs/datePicker';
import dayjs from 'dayjs';

const addressSchema = yup.object().shape({
  country: yup
    .string()
    .required('Страна обязательна')
    .min(2, 'Слишком короткое название')
    .max(50, 'Слишком длинное название'),
  city: yup
    .string()
    .required('Город обязателен')
    .min(2, 'Слишком короткое название')
    .max(50, 'Слишком длинное название'),
  street: yup
    .string()
    .required('Улица обязательна')
    .min(5, 'Слишком короткий адрес')
    .max(100, 'Слишком длинный адрес'),
  zipCode: yup
    .string()
    .required('Индекс обязателен')
    .matches(/^\d{5,6}(?:[-\s]\d{4})?$/, 'Некорректный формат индекса'),
});

interface FormData {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  dayOfBirth: Date;
  shippingAddress: {
    country: string;
    city: string;
    street: string;
    zipCode: string;
  };
  billingAddress: {
    country: string;
    city: string;
    street: string;
    zipCode: string;
  };
}

const formSchema = yup.object().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  phone: phoneValidationSchema,
  firstName: textValidationSchema,
  lastName: textValidationSchema,
  dayOfBirth: birthValidationSchema,
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});

const Step1 = ({
  control,
  errors,
  setValue,
  onNext,
  isValid,
}: {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  onNext: () => Promise<void>;
  isValid: boolean;
}) => {
  return (
    <div>
      <h6>Contact Information</h6>

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

      <div>
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
              shouldValidate: true,
            })
          }
          variant="outlined"
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
            required
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
            required
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
            required
          />
        )}
      />

      <Button
        className="next-button"
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

const AddressStep = ({
  control,
  onPrev,
  onNext,
  type,
  isValid,
}: {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  onPrev: () => void;
  onNext: () => Promise<void>;
  type: 'shipping' | 'billing';
  isValid: boolean;
}) => {
  const prefix = `${type}Address` as const;
  const title = type === 'shipping' ? 'Адрес доставки' : 'Платежный адрес';

  return (
    <div>
      <Typography variant="h6">{title}</Typography>

      <Controller
        name={`${prefix}.country`}
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id={`${prefix}-country`}
            label="Страна"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            required
          />
        )}
      />

      <Controller
        name={`${prefix}.city`}
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id={`${prefix}-city`}
            label="Город"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            required
          />
        )}
      />

      <Controller
        name={`${prefix}.street`}
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id={`${prefix}-street`}
            label="Улица"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            required
          />
        )}
      />

      <Controller
        name={`${prefix}.zipCode`}
        control={control}
        render={({ field, fieldState }) => (
          <InputText
            id={`${prefix}-zipCode`}
            label="Почтовый индекс"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            required
          />
        )}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button onClick={onPrev}>Назад</Button>
        <Button variant="contained" onClick={onNext}>
          {type === 'shipping' ? 'Продолжить' : 'Проверить'}
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button onClick={onPrev}>Назад</Button>
        <Button variant="contained" onClick={onNext} disabled={!isValid}>
          {type === 'shipping' ? 'Продолжить' : 'Проверить'}
        </Button>
      </div>
    </div>
  );
};

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [step1Valid, setStep1Valid] = useState(false);
  const [step2Valid, setStep2Valid] = useState(false);
  const [step3Valid, setStep3Valid] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<FormData>({
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
        country: '',
        city: '',
        street: '',
        zipCode: '',
      },
      billingAddress: {
        country: '',
        city: '',
        street: '',
        zipCode: '',
      },
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        step === 1 &&
        name &&
        [
          'email',
          'password',
          'phone',
          'firstName',
          'lastName',
          'dayOfBirth',
        ].includes(name)
      ) {
        trigger([
          'email',
          'password',
          'phone',
          'firstName',
          'lastName',
          'dayOfBirth',
        ]).then((isValid) => setStep1Valid(isValid));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, step, trigger]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (step === 2 && name && name.startsWith('shippingAddress')) {
        trigger([
          'shippingAddress.country',
          'shippingAddress.city',
          'shippingAddress.street',
          'shippingAddress.zipCode',
        ]).then((isValid) => setStep2Valid(isValid));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, step, trigger]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (step === 3 && name && name.startsWith('billingAddress')) {
        trigger([
          'billingAddress.country',
          'billingAddress.city',
          'billingAddress.street',
          'billingAddress.zipCode',
        ]).then((isValid) => setStep3Valid(isValid));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, step, trigger]);

  const nextStep = async () => {
    let isStepValid = false;
    const formValues = watch();

    switch (step) {
      case 1:
        console.log({
          email: formValues.email,
          password: formValues.password,
          phone: formValues.phone,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          dayOfBirth: formValues.dayOfBirth,
        });
        break;
      case 2:
        console.log(formValues.shippingAddress);
        break;
      case 3:
        console.log(formValues.billingAddress);
        break;
    }

    if (step === 1) {
      isStepValid = await trigger([
        'email',
        'password',
        'phone',
        'firstName',
        'lastName',
        'dayOfBirth',
      ]);
      setStep1Valid(isStepValid);
    } else if (step === 2) {
      isStepValid = await trigger([
        'shippingAddress.country',
        'shippingAddress.city',
        'shippingAddress.street',
        'shippingAddress.zipCode',
      ]);
      setStep2Valid(isStepValid);
    } else if (step === 3) {
      isStepValid = await trigger([
        'billingAddress.country',
        'billingAddress.city',
        'billingAddress.street',
        'billingAddress.zipCode',
      ]);
      setStep3Valid(isStepValid);
    }

    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            control={control}
            errors={errors}
            setValue={setValue}
            onNext={nextStep}
            isValid={step1Valid}
          />
        );
      case 2:
        return (
          <AddressStep
            control={control}
            errors={errors}
            onPrev={prevStep}
            onNext={nextStep}
            type="shipping"
            isValid={step2Valid}
          />
        );
      case 3:
        return (
          <AddressStep
            control={control}
            errors={errors}
            onPrev={prevStep}
            onNext={nextStep}
            type="billing"
            isValid={step3Valid}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: '500px', margin: '0 auto' }}
    >
      {renderStep()}
    </Box>
  );
};
