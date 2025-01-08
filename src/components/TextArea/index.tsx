import { ChangeEvent } from 'react';
import clsx from 'clsx';

import styles from './index.module.css';

type TextAreaProps = {
    value: string;
    placeholder?: string;
    label?: string;
    error?: string;
    required?: boolean | undefined;
    readOnly?: boolean;
    className?: string;
    maxLength?: number;
    onChange: ( value: string ) => void;
}
const TextArea = ( {
  value,
  placeholder,
  className,
  label,
  error,
  readOnly,
  onChange,
  required,
  maxLength
}: TextAreaProps ) => {

  const inputClassName = clsx(
    styles.input,
    error && styles.inputError,
    className && styles[className]
  );
    
  const handleChange = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
    onChange( event.target.value );
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <textarea
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        maxLength={maxLength}
        className={inputClassName}
      />
      {( error || maxLength ) && <div className={styles.info_box}>
        <span className={styles.error}>{error}</span>
        <span className={styles.limit}>Limit {value.length} of {maxLength}</span>
      </div>
      }
    </div>
  );
};

export default TextArea; 