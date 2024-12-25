export const formatDistance = ( value: number ) => {
  const distanceInMeters = value * 1000;
  if ( distanceInMeters < 1000 ) {
    return `${ Math.round( distanceInMeters ) } m`;
  } else {
    return `${ value.toFixed( 2 ) } km`;
  }
};