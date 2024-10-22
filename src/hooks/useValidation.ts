import { useState, useCallback } from 'react';

interface ValidationState {
  name: boolean;
  nameErrorMessage: string;
  email: boolean;
  emailErrorMessage: string;
  password: boolean;
  passwordErrorMessage: string;
  passwordConfirm: boolean;
  passwordConfirmErrorMessage: string;
}

const useValidation = () => {
  const [validationState, setValidationState] = useState<ValidationState>({
    name: true,
    nameErrorMessage: '',
    email: true,
    emailErrorMessage: '',
    password: true,
    passwordErrorMessage: '',
    passwordConfirm: true,
    passwordConfirmErrorMessage: '',
  });

  const updateValidation = useCallback(
    (
      field: keyof ValidationState,
      isValid: boolean,
      errorMessage: string = '',
    ) => {
      setValidationState((prevState) => ({
        ...prevState,
        [field]: isValid,
        [`${field}ErrorMessage`]: errorMessage,
      }));
    },
    [],
  );

  const validateName = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        updateValidation('name', false, '이름을 입력해 주세요.');
      } else {
        updateValidation('name', true, '');
      }
    },
    [updateValidation],
  );

  const validateEmail = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        updateValidation('email', false, '이메일은 필수 입력 값입니다.');
        return;
      }
      const regex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const isValid = regex.test(value);

      if (!isValid) {
        updateValidation('email', false, '유효하지 않은 이메일입니다.');
      } else {
        updateValidation('email', true, '');
      }
    },
    [updateValidation],
  );

  const validatePassword = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        updateValidation('password', false, '비밀번호는 필수 입력 값입니다.');
        return;
      }
      if (value.length < 8) {
        updateValidation(
          'password',
          false,
          '비밀번호는 최소 8자 이상이어야 합니다.',
        );
        return;
      }
      updateValidation('password', true, '');
    },
    [updateValidation],
  );

  const validatePasswordConfirm = useCallback(
    (value: string, currentPassword: string) => {
      if (value.trim() === '') {
        updateValidation(
          'passwordConfirm',
          false,
          '비밀번호 확인은 필수 입력 값입니다.',
        );
        return;
      }

      if (value !== currentPassword) {
        updateValidation(
          'passwordConfirm',
          false,
          '비밀번호가 일치하지 않습니다.',
        );
        return;
      }

      updateValidation('passwordConfirm', true, '');
    },
    [updateValidation],
  );

  return {
    validationState,
    validateName,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
  };
};

export default useValidation;
