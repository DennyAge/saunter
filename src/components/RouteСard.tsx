import { Card, CardContent, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface RouteItemProps {
    route: {
        id: string;
        name: string;
        shortDescription: string;
        fullDescription: string;
        length: number;
        favorite: boolean;
    };
    onFavoriteToggle: ( id: string ) => void;
}

const RouteCard = ( {
  route,
  onFavoriteToggle,
} : RouteItemProps ) => {
  return (
    <Card variant="outlined">
      <CardContent  className="d-flex space">
        <ZoomOutMapIcon sx={{ fontSize: 40 }}/>
        <div>
          <div className="d-flex">
            {route.favorite && <IconButton onClick={() => onFavoriteToggle( route.id )} color="primary">
              <StarIcon/>
            </IconButton>}
            <Typography variant="h6" component="div">
              {route.name}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary">
            {route.shortDescription}
          </Typography>
        </div>
        <Typography variant="h6" color="textSecondary">
          {route.length} km
        </Typography>

        <KeyboardArrowRightIcon sx={{ fontSize: 40 }}/>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
