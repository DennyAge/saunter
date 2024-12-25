import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Route {
    id: string ;
    title: string;
    shortDescription: string;
    fullDescription: string;
    length: number;
    favorite: boolean;
    markers: MarkerData[];
}
export interface MarkerData {
    lat: number;
    lng: number;
    title: string;
    id: string | number;
}

type RoutesState = {
    routes: Route[];
    selectRoute: Route | null;

};

const initialState: RoutesState = {
  routes: [],
  selectRoute: null
};

const routesSlice = createSlice( {
  name: 'routes',
  initialState,
  reducers: {
    addRoute( state, action: PayloadAction<Route[]> ) {
      state.routes = action.payload;
    },
    toggleFavorite( state, action: PayloadAction<string> ) {
      const route = state.routes.find( ( route ) => route.id === action.payload );
      if ( route ) {
        route.favorite = !route.favorite;
      }
    },
    deleteRoute( state, action: PayloadAction<string> ) {
      state.routes = state.routes.filter( ( route ) => route.id !== action.payload );
    },
    setSelectedRoute( state, action: PayloadAction<Route> ) {
      state.selectRoute = action.payload;
    }
  },
} );

export const { addRoute, deleteRoute, toggleFavorite, setSelectedRoute } = routesSlice.actions;
export default routesSlice.reducer;
 