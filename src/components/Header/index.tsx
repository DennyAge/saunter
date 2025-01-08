import { MdOutlineZoomOutMap } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import Button from '@/components/Button';

import styles from './index.module.css';


interface Props {
    openModal: ( b: boolean ) => void;
}

const Header = ( { openModal } : Props ) => {

  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <MdOutlineZoomOutMap className={styles.logo_img}/>
        <span>Saunter</span>
      </a>
      <div>
        <Button
          onClick={() => openModal( true )}
          variant="primary"
          icon={<LuPlus />}
        >
        Add path
        </Button>
      </div>
    </header>
  );
};

export default Header;
