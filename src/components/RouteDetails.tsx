import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';


import Map from './Map.tsx';

import { Route } from '../store/routesSlice.ts';
import EmptyContent from './EmptyContent.tsx';
import { formatDistance } from '@/helpers';


interface RouteDetailProps {
    route: Route | null;
    onFavoriteToggle: ( id: string, favorite: boolean ) => void;
    onDelete: ( id: string ) => void;
}

const RouteDetails = ( { route, onFavoriteToggle, onDelete } : RouteDetailProps ) => {


  const handleFavoriteClick = ( route: Route, favorite: boolean ) => {
    onFavoriteToggle( route.id, favorite );
  };

  const handleDeleteClick = ( route: Route ) => {
    onDelete( route.id );
  };

  if ( !route ) {
    return <EmptyContent/>;
  }
  return (
    <div

      className="block scrollable-content block_right"
    >
      <div
        className="details-header"
      >
        <Typography variant="h5" className="title">
          {route.title}
        </Typography>
        <Typography variant="h5" className="distance">
          {formatDistance( route.length )}
        </Typography>
      </div>
      <Typography variant="body1" color="text.secondary" >
        {route.fullDescription}
      </Typography>
      <Grid
        sx={{
          marginBottom: '2em',
        }}
      >
        <Map
          markers={route.markers}
          isEditing={false}
          onMarkersChange={() => null}
        />
      </Grid>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Button
          variant="text"
          color={route.favorite ? 'secondary' : 'primary'}
          onClick={() => handleFavoriteClick( route, !route.favorite )}
          className="btn"
        >
          {route.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={() => handleDeleteClick( route )}
          className="btn"
        >
            Remove
        </Button>
      </Box>
    </div>

  );
};

export default RouteDetails;
