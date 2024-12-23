import { Button } from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

interface Props {
    openModal: ( b: boolean ) => void;
}

const Header = ( { openModal } : Props ) => {

  return (
    <header className="header">
      <div className="logo">
        <ZoomOutMapIcon/>
        <span>Saunter</span>
      </div>
      <Button
        onClick={() => openModal( true )}
        variant="contained"
      >
          Add path
      </Button>
    </header>
  );
};

export default Header;
