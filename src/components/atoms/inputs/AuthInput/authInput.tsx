import { forwardRef } from 'react';
import On from '../../../../assets/images/showPasswordOn.svg?react';
import Off from '../../../../assets/images/showPasswordOff.svg?react';
import Warning from '../../../../assets/images/warning.svg?react';
import styles from './AuthInput.module.scss';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  isValid?: boolean;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      type,
      value,
      placeholder,
      onChange,
      errorMessage,
      isValid = true,
      showPassword = false,
      toggleShowPassword,
      onKeyDown,
    },
    ref,
  ) => (
    <div
      className={`${styles.inputBox} ${!isValid ? styles.inputBoxError : ''}`}
    >
      <label className={styles.label}>
        {label}
        <input
          type={showPassword ? 'text' : type}
          value={value}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={`${styles.input} ${!isValid ? styles.inputError : ''}`}
        />
        {toggleShowPassword && (
          <div className={styles.showBtn} onClick={toggleShowPassword}>
            {showPassword ? <On /> : <Off />}
          </div>
        )}
      </label>
      {!isValid && errorMessage && (
        <div className={styles.validMsg}>
          <Warning className={styles.warning} />
          {errorMessage}
        </div>
      )}
    </div>
  ),
);

export default InputField;
