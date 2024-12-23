import SearchInput from './SearchInput.tsx';
import { Grid } from '@mui/material';
import RouteCard from './RouteСard.tsx';
import { useState } from 'react';


export interface Route {
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    length: number;
    favorite: boolean;
}

interface RouteListProps {
    routes: Route[];
    onFavoriteToggle: ( id: string ) => void;
    onRouteSelect: ( route: Route ) => void;
}

const RouteList = ( { routes, onFavoriteToggle, onRouteSelect } : RouteListProps ) => {
  const [ searchQuery, setSearchQuery ] = useState( '' );

  const filteredRoutes = routes.filter( route =>
    route.name.toLowerCase().includes( searchQuery.toLowerCase() ) ||
        route.shortDescription.toLowerCase().includes( searchQuery.toLowerCase() )
  );

  const sortedRoutes = filteredRoutes.sort( ( a, b ) => ( b.favorite ? 1 : 0 ) - ( a.favorite ? 1 : 0 ) );

  return (
    <div className="route_list">
      <SearchInput value={searchQuery} onChange={( e ) => setSearchQuery( e.target.value )}/>

      <Grid container spacing={2}>
        {sortedRoutes.map( ( route ) => (
          <Grid item key={route.id} xs={12} sm={12} md={12} onClick={() => onRouteSelect( route )} >
            <RouteCard route={route} onFavoriteToggle={onFavoriteToggle} />
          </Grid>
        ) )}
      </Grid>
    </div>
  );
};

export default RouteList;
