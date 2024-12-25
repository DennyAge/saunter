import { Card, CardContent, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


import { Route } from '../store/routesSlice.ts';
import { formatDistance } from '../helpers';

interface RouteItemProps {
    route: Route
    selectRouteId: string | null| undefined
}

const RouteCard = ( {
  route,
  selectRouteId
} : RouteItemProps ) => {
  return (
    <Card variant="outlined">
      <CardContent  className={`${ route.id === selectRouteId ? 'active' : '' } card`} >
        <ZoomOutMapIcon sx={{ fontSize: 40 }}/>
        <div>
          <div className="card_title">
            {route.favorite && <StarIcon color="primary" />}
            <Typography variant="h6" >
              {route.title}
            </Typography>
          </div>
          <Typography variant="body2" >
            {route.shortDescription}
          </Typography>
        </div>
        <Typography variant="h6" >
          {formatDistance( route.length )}
        </Typography>

        <KeyboardArrowRightIcon sx={{ fontSize: 40 }}/>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
