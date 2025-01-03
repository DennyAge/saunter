import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Divider, useMediaQuery } from '@mui/material';

import { addRoute, deleteRoute, toggleFavorite, setSelectedRoute, Route } from '../store/routesSlice.ts';
import { RootState } from '../store';
import { fetchRoutes, addRouteToFirebase, updateRouteFavoriteStatus, deleteRouteFromFirebase } from '../services/firebaseService.ts';

import Header from '../components/Header.tsx';
import RouteList from '../components/RouteList.tsx';
import RouteDetails from '../components/RouteDetails.tsx';
import AddRouteModal, { AddRoute } from '../components/AddRouteModal.tsx';
import EmptyContent from '../components/EmptyContent.tsx';
import Loader from '../components/Loader.tsx';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { routes, selectRoute } = useSelector( ( state: RootState ) => state.routes );

  const [ openAddModal, setOpenAddModal ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( false );

  const isSmallScreen = useMediaQuery( '(max-width:900px)' );

  useEffect( () => {
    const loadRoutes = async () => {
      setIsLoading( true );
      try {
        const routesData = await fetchRoutes();
        dispatch( addRoute( routesData ) );
      } catch ( error ) {
        console.error( 'Failed to fetch routes:', error );
      } finally {
        setIsLoading( false );
      }
    };

    loadRoutes();
  }, [ dispatch ] );

  const handleAddRoute = async ( newRoute: AddRoute ) => {
    setIsLoading( true );
    try {
      const addedRoute = await addRouteToFirebase( newRoute );
      dispatch( addRoute( [ addedRoute ] ) );
      dispatch( setSelectedRoute( addedRoute ) );
    } catch ( error ) {
      console.error( 'Failed to add route:', error );
    } finally {
      setIsLoading( false );
    }
  };

  const handleSelectRoute = ( route: Route ) => {
    dispatch( setSelectedRoute( route ) );
  };

  const handleFavoriteToggle = async ( id: string, favorite: boolean ) => {
    try {
      await updateRouteFavoriteStatus( id, favorite );
      dispatch( toggleFavorite( id ) );
      if ( selectRoute && selectRoute.id === id ) {
        dispatch( setSelectedRoute( { ...selectRoute, favorite } ) );
      }
    } catch ( error ) {
      console.error( 'Failed to update favorite status:', error );
    }
  };

  const handleDeleteRoute = async ( id: string ) => {
    try {
      await deleteRouteFromFirebase( id );
      dispatch( deleteRoute( id ) );
      if ( selectRoute?.id === id ) {
        dispatch( setSelectedRoute( null ) );
      }
    } catch ( error ) {
      console.error( 'Failed to delete route:', error );
    }
  };

  return (
    <div className="main">
      {isLoading && <Loader />}
      <div className="content">
        <Header openModal={setOpenAddModal} />
        <div className="content__container">
          <Divider orientation="horizontal" flexItem className="divider" />
          {routes.length ? (
            <div className="page__content">
              <RouteList
                routes={routes}
                onRouteSelect={handleSelectRoute}
                selectRouteId={selectRoute?.id}
              />
              <Divider orientation={isSmallScreen ? 'horizontal' : 'vertical'} flexItem />
              <RouteDetails
                route={selectRoute}
                onFavoriteToggle={handleFavoriteToggle}
                onDelete={handleDeleteRoute}
              />
            </div>
          ) : (
            <EmptyContent text="Please add new path" />
          )}
        </div>
      </div>
      <AddRouteModal
        onClose={setOpenAddModal}
        open={openAddModal}
        onAddRoute={handleAddRoute}
      />
    </div>
  );
};

export default DashboardPage; 