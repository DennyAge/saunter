import SearchInput from './SearchInput.tsx';
import Grid from '@mui/material/Grid2';
import RouteCard from './RouteСard.tsx';
import { useState } from 'react';
import { Route } from '../store/routesSlice.ts';



interface RouteListProps {
    routes: Route[];
    onFavoriteToggle: ( id: string ) => void;
    onRouteSelect: ( route: Route ) => void;
}

const RouteList = ( { routes, onFavoriteToggle, onRouteSelect } : RouteListProps ) => {
  const [ searchQuery, setSearchQuery ] = useState( '' );

  const filteredRoutes = routes.filter( route =>
    route.title.toLowerCase().includes( searchQuery.toLowerCase() ) ||
        route.shortDescription.toLowerCase().includes( searchQuery.toLowerCase() )
  );

  const sortedRoutes = filteredRoutes.sort( ( a, b ) => ( b.favorite ? 1 : 0 ) - ( a.favorite ? 1 : 0 ) );

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
      <SearchInput
        value={searchQuery}
        onChange={( e ) => setSearchQuery( e.target.value )}
      />
      <Grid
        container
        spacing={2}
        sx={{
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {sortedRoutes.map( ( route ) => (
          <Grid
            key={route.id}
            size={{ xs: 12 }}
            onClick={() => onRouteSelect( route )}
          >
            <RouteCard
              route={route}
              onFavoriteToggle={onFavoriteToggle}
            />
          </Grid>
        ) )}
      </Grid>
    </Grid>


  );
};

export default RouteList;
