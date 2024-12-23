import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';

interface Props {
    onClose: ( b: boolean ) => void;
}

const AddRouteModal = ( {  onClose }: Props ) => {

  return (
    <div className="modal_overlay">
      <div className="modal">
        <div className="modal_header">
          <div>
                Add new path
          </div>
          <button
            onClick={() => onClose( false )}
          >
            <ClearIcon/>
          </button>
        </div>
        <div className="modal_content">
          <label htmlFor="title">Title</label>
          <TextField fullWidth id="title"/>
          <label htmlFor="short-description">Short description</label>
          <TextField fullWidth id="short-description" rows={4}/>
          <label htmlFor="full-description">Full description</label>
          <TextField fullWidth id="full-description" rows={8}/>
        </div>
      </div>
    </div>

  );
};

export default AddRouteModal;
