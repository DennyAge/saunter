import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { Route } from '../store/routesSlice.ts';

export const fetchRoutes = async (): Promise<Route[]> => {
  const querySnapshot = await getDocs( collection( db, 'routes' ) );
  return querySnapshot.docs.map( ( doc ) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || '',
      shortDescription: data.shortDescription || '',
      fullDescription: data.fullDescription || '',
      length: data.length || 0,
      favorite: data.favorite || false,
      markers: data.markers || [],
    };
  } );
};

export const addRouteToFirebase = async ( newRoute: Omit<Route, 'id'> ): Promise<Route> => {
  const docRef = await addDoc( collection( db, 'routes' ), newRoute );
  return { id: docRef.id, ...newRoute };
};

export const updateRouteFavoriteStatus = async ( id: string, favorite: boolean ): Promise<void> => {
  const docRef = doc( db, 'routes', id );
  await updateDoc( docRef, { favorite } );
};

export const deleteRouteFromFirebase = async ( id: string ): Promise<void> => {
  await deleteDoc( doc( db, 'routes', id ) );
}; 