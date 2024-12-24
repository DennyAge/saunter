import { useEffect, useState } from 'react';
import {
  GoogleMap,
  MarkerF,
  Polyline,
  useLoadScript,
} from '@react-google-maps/api';

import { CircularProgress, Stack } from '@mui/material';
import { MarkerData } from '../store/routesSlice';


interface MapWithRoutesProps {
  markers: MarkerData[];
  isEditing: boolean;
  onMarkersChange: ( markers: MarkerData[], length: number ) => void;
}

const Map = ( { markers, isEditing, onMarkersChange }: MapWithRoutesProps ) => {
  const [ directions, setDirections ] = useState<google.maps.DirectionsResult | null>( null );
  const [ distance, setDistance ] = useState<number>( 0 );

  const { isLoaded } = useLoadScript( {
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: [ 'places', 'geometry' ]
  } );

  useEffect( () => {
    if ( isLoaded ) {

      calculateRoute();
      calculateDistance();
    }
  }, [ markers, isLoaded ] );

  const calculateRoute = () => {
    if ( markers.length < 1 ) {return;}

    const directionsService = new google.maps.DirectionsService();
    const waypoints = markers.slice( 1, -1 ).map( ( marker ) => ( {
      location: { lat: marker.lat, lng: marker.lng },
      stopover: true,
    } ) );

    directionsService.route(
      {
        origin: { lat: markers[0].lat, lng: markers[0].lng },
        destination: { lat: markers[markers.length - 1].lat, lng: markers[markers.length - 1].lng },
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      ( result, status ) => {
        if ( status === 'OK' ) {
          setDirections( result );
        } else {
          console.error( 'Error fetching directions', status );
        }
      }
    );
  };

  const calculateDistance = () => {
    if ( !isEditing || markers.length < 2 ) {return;}

    let totalDistance = 0;
    for ( let i = 0; i < markers.length - 1; i++ ) {
      const start = new google.maps.LatLng( markers[i].lat, markers[i].lng );
      const end = new google.maps.LatLng( markers[i + 1].lat, markers[i + 1].lng );
      totalDistance += google.maps.geometry.spherical.computeDistanceBetween( start, end );
    }

    const totalDistanceKm = totalDistance / 1000;
    setDistance( totalDistanceKm );
    onMarkersChange( markers, totalDistanceKm );
  };

  const handleMapClick = ( event: google.maps.MapMouseEvent ) => {
    if ( !isEditing || !event.latLng ) {return;}

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newMarker: MarkerData = { lat, lng, title: `Marker ${ markers.length + 1 }`, id: lat + lng };

    const updatedMarkers = [ ...markers, newMarker ];
    onMarkersChange( updatedMarkers, distance );
  };

  const handleMarkerClick = ( markerIndex: number ) => {
    if ( !isEditing ) {return;}

    const updatedMarkers = markers.filter( ( _, index ) => index !== markerIndex );

    if ( updatedMarkers.length < 1 ) {
      setDistance( 0 );
    }

    onMarkersChange( updatedMarkers, 0 );
  };

  const renderPolyline = () => {
    if ( !directions ) {return null;}
    const path = directions.routes[0].overview_path.map( ( point ) => ( {
      lat: point.lat(),
      lng: point.lng(),
    } ) );
    return <Polyline path={path} options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 4 }} />;
  };

  if ( !isLoaded ) {
    return (
      <Stack
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '400px' }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (

    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '300px' }}
      center={markers.length > 0 ? markers[0] : { lat: 40.4093, lng: 49.8671 }}
      zoom={14}
      onClick={handleMapClick}
    >
      {markers.map( ( marker, index ) => (
        <MarkerF
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.title}
          onClick={() => handleMarkerClick( index )}
        />
      ) )}
      {renderPolyline()}
    </GoogleMap>
  );
};

export default Map;
