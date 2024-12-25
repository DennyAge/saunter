import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Divider, useMediaQuery } from '@mui/material';

import { addRoute, deleteRoute, Route, toggleFavorite, setSelectedRoute } from '../store/routesSlice.ts';
import { RootState } from '../store';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';

import Header from '../components/Header.tsx';
import RouteList from '../components/RouteList.tsx';
import RouteDetails from '../components/RouteDetails.tsx';
import AddRouteModal from '../components/AddRouteModal.tsx';
import EmptyContent from '../components/EmptyContent.tsx';
import Loader from '../components/Loader.tsx';

const DashboardPage = () => {
  const dispatch = useDispatch();

  const routes = useSelector( ( state: RootState ) => state.routes.routes );
  const selectedRoute = useSelector( ( state: RootState ) => state.routes.selectRoute );

  const [ openAddModal, setOpenAddModal ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( false );

  const isSmallScreen = useMediaQuery( '(max-width:900px)' );

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

  const handleAddRoute = async ( newRoute: Route ) => {
    setIsLoading( true );

    const docRef = await addDoc( collection( db, 'routes' ), newRoute );
    dispatch( addRoute( [ ...routes, { id: docRef.id, ...newRoute } ] ) );
    dispatch( setSelectedRoute( { id: docRef.id, ...newRoute }  ) );

    setIsLoading( false );
  };

  const handleSelectRoute = ( route: Route ) => {
    dispatch( setSelectedRoute( route ) );
  };

  const handleFavoriteToggle = async ( id: string, favorite: boolean ) => {
    const docRef = doc( db, 'routes', id );
    await updateDoc( docRef, { favorite } );

    dispatch( toggleFavorite( id ) );
    if ( selectedRoute && selectedRoute.id === id ) {
      dispatch(
        setSelectedRoute( {
          ...selectedRoute,
          favorite: favorite,
        } )
      );
    }
  };
  const handleDeleteRoute = async ( id: string ) => {
    await deleteDoc( doc( db, 'routes', id ) );
    dispatch( deleteRoute( id ) );

    if ( selectedRoute?.id === id ) {
      dispatch( setSelectedRoute( null ) );
    }
  };
  return (
    <div className="main">
      {isLoading && <Loader/>}
      <div className="content">
        <Header openModal={setOpenAddModal}/>
        <div className="content__container" >
          <Divider
            orientation="horizontal"  flexItem className="divider"
          />
          {routes.length ? <div className="page__content">
            <RouteList
              routes={routes}
              onRouteSelect={handleSelectRoute}
              selectRouteId={selectedRoute?.id}
            />
            <Divider
              orientation={isSmallScreen ? 'horizontal' : 'vertical'}
              flexItem
            />
            <RouteDetails
              route={selectedRoute}
              onFavoriteToggle={handleFavoriteToggle}
              onDelete={handleDeleteRoute}
            />
          </div> : <EmptyContent text="Pleace add new path"  />
          }

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
