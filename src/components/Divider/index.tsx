import clsx from 'clsx';

import styles from './index.module.css';

interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    flexItem?: boolean;
}

const Divider = ( { orientation, flexItem }: DividerProps ) => {
    
  const dividerClasses = clsx(
    styles.divider,
    orientation === 'horizontal' ? styles.horizontal : styles.vertical,
    flexItem && styles.flexItem
  );

  return <div className={dividerClasses} />;
};

export default Divider;