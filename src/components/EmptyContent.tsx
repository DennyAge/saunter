import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { Typography } from '@mui/material';


interface EmptyContentProps {
    text?: string;
}
const EmptyContent = ( { text = 'Select any path' }: EmptyContentProps ) => {
  return (
    <div className="block empty_details">
      <ZoomOutMapIcon sx={{ fontSize: 100 }} color="disabled"/>
      <Typography variant="h6" color="textDisabled">{text}</Typography>
    </div>
  );
};

export default EmptyContent;
