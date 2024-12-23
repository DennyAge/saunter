import  { useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';

import { Route } from './RouteList';


interface RouteDetailProps {
    route: Route;
    onFavoriteToggle: ( id: string ) => void;
    onDelete: ( id: string ) => void;
}

const RouteDetails = ( { route, onFavoriteToggle, onDelete } : RouteDetailProps ) => {

  const mapRef = useRef<any>( null );

  const handleFavoriteClick = () => {
    onFavoriteToggle( route.id );
  };

  const handleDeleteClick = () => {
    onDelete( route.id );
  };

  const API_KEY =  'AIzaSyASul7xfn9NnTHxBG3bvuFA38UxbcSorek';

  const renderMap = () => {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={10}
        ref={mapRef}
      >

      </GoogleMapReact>
    );
  };

  if ( !route ) {
    return <Typography variant="h6" className="route_details">Select a route to see details</Typography>;
  }
  return (
    <div className="route_details">
      <Card>
        <CardContent>

          <Typography variant="h5" gutterBottom>
            {route.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {route.fullDescription}
          </Typography>
          <Typography variant="body2" color="textSecondary">
                    Length: {route.length} km
          </Typography>
          <Grid item xs={12} md={8}>
            <div style={{ height: '400px', width: '100%' }}>
              {renderMap()}
            </div>
          </Grid>
          <div>
            <Button
              variant="text"
              color={route.favorite ? 'secondary' : 'primary'}
              onClick={handleFavoriteClick}
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
          </div>
        </CardContent>
      </Card>
    </div>

  );
};

export default RouteDetails;
