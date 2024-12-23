import { useState } from 'react';
import { Divider } from '@mui/material';

import Header from './components/Header.tsx';
import RouteList, { Route } from './components/RouteList.tsx';
import RouteDetails from './components/RouteDetails.tsx';
import AddRouteModal from './components/AddRouteModal.tsx';

import { mockRoutes } from './mockRoutes.ts';

function App() {
  const [ openAddModal, setOpenAddModal ] = useState( false );
  const [ routes, setRoutes ] = useState( mockRoutes );
  const [ selectedRoute, setSelectedRoute ] = useState<Route | null>( null );

  const handleFavoriteToggle = ( id: string ) => {
    setRoutes( prevRoutes =>
      prevRoutes.map( route =>
        route.id === id ? { ...route, favorite: !route.favorite } : route
      )
    );
  };

  const handleDeleteRoute = ( id: string ) => {
    setRoutes( prevRoutes => prevRoutes.filter( route => route.id !== id ) );
  };

  const handleSelectRoute = ( route: Route ) => {
    setSelectedRoute( route );
  };

  return (
    <main>
      <Header openModal={setOpenAddModal} />
      <div className="dashboard" style={{ display: 'flex' }}>
        <RouteList
          routes={routes}
          onFavoriteToggle={handleFavoriteToggle}
          onRouteSelect={handleSelectRoute}
        />
        <Divider variant="fullWidth" orientation="vertical" flexItem />
        <RouteDetails route={selectedRoute}  onFavoriteToggle={handleFavoriteToggle}  onDelete={handleDeleteRoute}/>
      </div>
      {openAddModal && <AddRouteModal onClose={setOpenAddModal} />}
    </main>
  );
}

export default App;
