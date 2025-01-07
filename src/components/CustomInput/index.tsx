import React, { useRef } from 'react';
import { IoClose } from 'react-icons/io5';

import styles from './index.module.css';
import clsx from 'clsx';


type CustomInputProps = {
    value: string | number;
    placeholder?: string;
    label?: string;
    error?: string;
    required?: boolean | undefined;
    type?: string;
    readOnly?: boolean;
    removeBtn?: boolean;
    className?: string;
    rightIcon?: React.ReactElement;
    leftIcon?: React.ReactElement;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;

    onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}
const Input = ( {
  value,
  placeholder,
  className,
  label,
  error,
  type,
  readOnly,
  onChange,
  required,
  rightIcon,
  leftIcon,
  max,
  min,
  maxLength,
  removeBtn = false
}: CustomInputProps ) => {

  const inputRef = useRef<HTMLInputElement>( null );

  const handleClear = () => {
    if ( inputRef.current ) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange( event );
    }
  };

  const inputClassName = clsx(
    styles.input,
    { [styles.inputError]: error },
    { [styles.inputIcon_right]: rightIcon || removeBtn },
    { [styles.inputIcon_left]: leftIcon },
    { [styles.inputIcons]: leftIcon && ( rightIcon || removeBtn ) },
    className
  );
    
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.input_container}>
        <div className={styles.left_input_content}>
          {leftIcon && leftIcon}
        </div>
        <input
          ref={inputRef}
          type={type}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          maxLength={maxLength}
          className={inputClassName}
        />

        <div className={styles.right_input_content}>
          {removeBtn && value && (
            <button type="button" className={styles.clear_btn} onClick={handleClear}>
              <IoClose/>
            </button> )}
          {rightIcon && rightIcon}
        </div>
      </div>
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export default Input;
