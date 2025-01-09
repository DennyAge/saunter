import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


import { addRoute, deleteRoute, toggleFavorite, setSelectedRoute, Route } from '@/store/routesSlice.ts';
import { RootState } from '@/store';
import {
  fetchRoutes,
  addRouteToFirebase,
  updateRouteFavoriteStatus,
  deleteRouteFromFirebase } from '@/services/firebaseService.ts';

import Header from '@/components/Header';
import RouteList from './components/RouteList';
import RouteDetails from './components/RouteDetails';
import AddRouteModal, { AddRoute } from '@/components/AddRouteModal.tsx';
import EmptyContent from '@/components/EmptyContent/';
import Loader from '@components/Loader';
import Divider from '@components/Divider';

import styles from './index.module.css';



const DashboardPage = () => {
  const dispatch = useDispatch();
  const { routes, selectRoute } = useSelector( ( state: RootState ) => state.routes );

  const [ openAddModal, setOpenAddModal ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( false );

  const [ isSmallScreen, setIsSmallScreen ] = useState( false );

  const checkScreenSize = () => {
    setIsSmallScreen( window.innerWidth < 900 );
  };

  useEffect( () => {
    checkScreenSize();
    window.addEventListener( 'resize', checkScreenSize );
    return () => window.removeEventListener( 'resize', checkScreenSize );
  }, [] );


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
  }, [] );

  const handleAddRoute = async ( newRoute: AddRoute ) => {
    setIsLoading( true );
    try {
      const addedRoute = await addRouteToFirebase( newRoute );
      dispatch( addRoute( [ ...routes, { id: addedRoute.id, ...newRoute } ] ) );
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
      if ( selectRoute && selectRoute.id === id ) {dispatch( setSelectedRoute( { ...selectRoute, favorite } ) );
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
    <div className={styles.dashboard_page}>
      {isLoading && <Loader />}
      <Header openModal={setOpenAddModal} />
      <div className={styles.container}>
        <Divider orientation="horizontal"   />
        {routes.length ? (
          <div className={styles.content}>
            <RouteList
              routes={routes}
              onRouteSelect={handleSelectRoute}
              onFavoriteToggle={handleFavoriteToggle}
              selectRouteId={selectRoute?.id}
            />
            <Divider orientation={isSmallScreen ? 'horizontal' : 'vertical'}  />
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
      <AddRouteModal
        onClose={setOpenAddModal}
        open={openAddModal}
        onAddRoute={handleAddRoute}
      />
    </div>
  );
};

export default DashboardPage; 