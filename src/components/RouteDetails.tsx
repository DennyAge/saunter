import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';


import Map from './Map.tsx';
import { Route } from '../store/routesSlice.ts';


interface RouteDetailProps {
    route: Route;
    onFavoriteToggle: ( id: string, favorite: boolean ) => void;
    onDelete: ( id: string ) => void;
}


const RouteDetails = ( { route, onFavoriteToggle, onDelete } : RouteDetailProps ) => {


  const handleFavoriteClick = ( route: Route, favorite: boolean ) => {
    onFavoriteToggle( route.id, favorite );
  };

  const handleDeleteClick = () => {
    onDelete( route.id );
  };

  if ( !route ) {
    return (
      <Grid    size={{ xs: 12, sm: 12, md: 5 }}>
        <Typography variant="h6" className="route_details">Select a route to see details</Typography>
      </Grid>
    );
  }
  return (
    <Grid
      size={{ xs: 12, sm: 12, md: 6 }}
      sx={{
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="0.5em"
      >
        <Typography variant="h5">
          {route.title}
        </Typography>
        <Typography variant="h5">
          {route.length.toFixed( 2 )} km
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" paragraph>
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
        />
      </Grid>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Button
          variant="text"
          color={route.favorite ? 'secondary' : 'primary'}
          onClick={() => handleFavoriteClick( route, !route.favorite )}
        >
          {route.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={handleDeleteClick}
        >
            Remove
        </Button>
      </Box>
    </Grid>

  );
};

export default RouteDetails;
