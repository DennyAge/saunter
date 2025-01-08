import React from 'react';
import clsx from 'clsx';

//style
import styles from './index.module.css';

type Props = {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button' | undefined;
    variant?: 'primary' | 'secondary' | 'ghost' | 'uppercase' | 'icon' | string;
    disabled?: boolean;
    icon?: React.ReactElement;
}
const Button = ( { children, type, variant, onClick, disabled, icon } : Props ) => {
  const buttonClassName = clsx( styles.btn, variant && styles[variant] );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClassName}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button; 