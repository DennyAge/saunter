import { createSlice } from '@reduxjs/toolkit';

interface Route {
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    length: number;
    favorite: boolean;
    markers: Array<{ lat: number; lng: number }>;
}

type RoutesState = {
    routes: Route[];
    favorites: Route[];
    searchQuery: string;
};

const initialState: RoutesState = {
  routes: [],
  favorites: [],
  searchQuery: ''
};

const routesSlice = createSlice( {
  name: 'routes',
  initialState,
  reducers: {
    addRoute: ( state, action ) => {
      state.routes.push( action.payload );
    },
    deleteRoute: ( state, action ) => {
      state.routes = state.routes.filter( route => route.id !== action.payload );
    },
    toggleFavorite: ( state, action ) => {
      const route = state.routes.find( route => route.id === action.payload );
      if ( route ) {route.favorite = !route.favorite;}
    },
  },
} );

export const { addRoute, deleteRoute, toggleFavorite } = routesSlice.actions;
export default routesSlice.reducer;
 