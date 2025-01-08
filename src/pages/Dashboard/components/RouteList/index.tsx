import { useState } from 'react';
import clsx from 'clsx';
import { CiSearch } from 'react-icons/ci';

import { Route } from '@/store/routesSlice.ts';

import CustomInput from '@components/CustomInput';
import RouteCard from '../RouteCard';

import styles from './index.module.css';

interface RouteListProps {
    routes: Route[];
    onRouteSelect: ( route: Route ) => void;
    selectRouteId: string | null | undefined;
    onFavoriteToggle: ( id: string, favorite: boolean ) => void;
}

const RouteList = ( { routes, onRouteSelect, selectRouteId, onFavoriteToggle } : RouteListProps ) => {
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
    <div className={styles.half_block}>
      <CustomInput
        value={searchQuery}
        onChange={( e ) => setSearchQuery( e.target.value )}
        removeBtn
        placeholder="Search..."
        leftIcon={<CiSearch />}
      />
      <div
        className={clsx( 'scrollable-content', styles.block_left )}
      >
        {sortedRoutes.map( ( route ) => (
          <div
            key={route.id}
            onClick={() => handleSelectRoute( route )}
            className={styles.list_item}
          >
            <RouteCard
              route={route}
              selectRouteId={selectRouteId}
              onFavoriteToggle={onFavoriteToggle}
            />
          </div>
        ) )}
      </div>
    </div>


  );
};

export default RouteList;

