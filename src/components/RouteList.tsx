import { useState } from 'react';
import { Box } from '@mui/material';

import { Route } from '../store/routesSlice.ts';

import SearchInput from './SearchInput.tsx';
import RouteCard from './RouteСard.tsx';


interface RouteListProps {
    routes: Route[];
    onRouteSelect: ( route: Route ) => void;
    selectRouteId: string | null | undefined;
}

const RouteList = ( { routes, onRouteSelect, selectRouteId } : RouteListProps ) => {
  const [ searchQuery, setSearchQuery ] = useState( '' );

  const filteredRoutes = routes.filter( route =>
    route.title.toLowerCase().includes( searchQuery.toLowerCase() ) ||
      route.fullDescription.toLowerCase().includes( searchQuery.toLowerCase() )
  );

  const sortedRoutes = filteredRoutes.sort( ( a, b ) => ( b.favorite ? 1 : 0 ) - ( a.favorite ? 1 : 0 ) );

  const handleSelectRoute = ( route: Route ) => {
    onRouteSelect( route );
  };

  return (
    <div className="block">
      <SearchInput
        value={searchQuery}
        onChange={( e ) => setSearchQuery( e.target.value )}
      />
      <div
        className="block_left scrollable-content"
      >
        {sortedRoutes.map( ( route ) => (
          <Box
            key={route.id}
            onClick={() => handleSelectRoute( route )}
            className="list_item"
          >
            <RouteCard
              route={route}
              selectRouteId={selectRouteId}
            />
          </Box>
        ) )}
      </div>
    </div>


  );
};

export default RouteList;
