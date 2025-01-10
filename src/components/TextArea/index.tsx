import clsx from 'clsx';

import styles from './index.module.css';

type TextAreaProps = {
    value: string;
    placeholder?: string;
    name?: string;
    label?: string;
    error?: string;
    required?: boolean | undefined;
    readOnly?: boolean;
    className?: string;
    maxLength?: number;
    rows?: number;
    onChange: ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;
}
const TextArea = ( {
  value,
  placeholder,
  className,
  label,
  rows = 4,
  name,
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


  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className={inputClassName}
      />
      {( error || maxLength ) && <div className={styles.info_box}>
        <span className={styles.error}>{error}</span>
        { maxLength && <span className={styles.limit}>Limit {value.length} of {maxLength}</span>}
      </div>
      }
    </div>
  );
};

export default TextArea; 