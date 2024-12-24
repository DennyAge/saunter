import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';


import Header from './components/Header.tsx';
import RouteList from './components/RouteList.tsx';
import RouteDetails from './components/RouteDetails.tsx';
import AddRouteModal from './components/AddRouteModal.tsx';

import { db } from './firebase.ts';
import { addRoute, toggleFavorite, deleteRoute, Route } from './store/routesSlice.ts';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {
  const dispatch = useDispatch();
  const routes = useSelector( ( state: any ) => state.routes.routes );  // Извлекаем маршруты из Redux
  const [ openAddModal, setOpenAddModal ] = useState( false );
  const [ selectedRoute, setSelectedRoute ] = useState<Route | null>( null );

  useEffect( () => {
    const fetchRoutes = async () => {
      const querySnapshot = await getDocs( collection( db, 'routes' ) );
      const routesData = querySnapshot.docs.map( ( doc ) => ( {
        id: doc.id,
        ...doc.data(),
      } ) );
      dispatch( addRoute( routesData ) );
    };

    fetchRoutes();
  }, [ dispatch ] );

  const handleFavoriteToggle = async ( id: string, favorite: boolean ) => {
    const docRef = doc( db, 'routes', id );
    await updateDoc( docRef, { favorite } );

    dispatch( toggleFavorite( id ) );
    if ( selectedRoute && selectedRoute.id === id ) {
      setSelectedRoute( ( prevRoute ) => {
        if ( prevRoute ) {
          return { ...prevRoute, favorite: favorite }; // Обновляем только поле favorite
        }
        return prevRoute;
      } );
    }
  };

  const handleDeleteRoute = async ( id: string ) => {
    await deleteDoc( doc( db, 'routes', id ) );
    dispatch( deleteRoute( id ) );

    if ( selectedRoute?.id === id ) {
      setSelectedRoute( null );
    }
  };

  const handleSelectRoute = ( route: Route ) => {
    setSelectedRoute( route );

  };

  const handleAddRoute = async ( newRoute: Route ) => {
    const docRef = await addDoc( collection( db, 'routes' ), newRoute );  // Добавляем маршрут в Firebase
    dispatch( addRoute( [ ...routes, { id: docRef.id, ...newRoute } ] ) );
    setSelectedRoute( newRoute );
  };

  return (

    <main>
      <Header openModal={setOpenAddModal}/>
      <Box component="div" className="dashboard" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row', md: 'row' } }} alignItems="stretch">
          <RouteList
            routes={routes}
            onFavoriteToggle={handleFavoriteToggle}
            onRouteSelect={handleSelectRoute}
          />
          <RouteDetails
            route={selectedRoute}
            onFavoriteToggle={handleFavoriteToggle}
            onDelete={handleDeleteRoute}
          />
        </Grid>
      </Box>
      <AddRouteModal
        onClose={setOpenAddModal}
        open={openAddModal}
        onAddRoute={handleAddRoute}
      />
    </main>

  );
}

export default App;
 