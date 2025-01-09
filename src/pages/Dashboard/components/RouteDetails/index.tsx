import { PiTrashLight } from 'react-icons/pi';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { MdOutlineModeEdit } from 'react-icons/md';



import Map from '@/components/Map.tsx';
import { Route } from '@/store/routesSlice.ts';
import EmptyContent from '@/components/EmptyContent';
import Button from '@/components/Button';
import { formatDistance } from '@/helpers';

import styles from './index.module.css';
import clsx from 'clsx';

interface RouteDetailProps {
    route: Route | null;
    onFavoriteToggle: ( id: string, favorite: boolean ) => void;
    onDelete: ( id: string ) => void;
}

const RouteDetails = ( { route, onFavoriteToggle, onDelete } : RouteDetailProps ) => {


  const handleFavorite = ( route: Route, favorite: boolean ) => {
    onFavoriteToggle( route.id, favorite );
  };

  const handleDelete = ( route: Route ) => {
    onDelete( route.id );
  };
  const handleEdit = ( route: Route ) => {
    console.log( route.id );
  };

  if ( !route ) {
    return <EmptyContent/>;
  }
  return (
    <div
      className={clsx( 'scrollable-content', styles.half_block )}
    >
      <div
        className={styles.details_header }
      >
        <h5 className={styles.details_title}>
          {route.title}
        </h5>
        <span className={styles.details_distance}>
          {formatDistance( route.length )}
        </span>
      </div>
      <p className={styles.details_text }>
        {route.fullDescription}
      </p>
      <div className={styles.map_box}>
        <Map
          markers={route.markers}
          isEditing={false}
          onMarkersChange={() => null}
        />
      </div>

      <Button
        onClick={() => handleFavorite( route, !route.favorite )}
        variant="primary"
        icon={route.favorite ? <FaStar/> : <FaRegStar/>}
      >
        {route.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
      <div className={styles.details_footer}>
        <Button
          onClick={() => handleDelete( route )}
          variant="secondary"
          icon={<PiTrashLight/>}
        >
          Remove
        </Button>
        <Button
          onClick={() => handleEdit( route )}
          variant="secondary"
          icon={<MdOutlineModeEdit />}
          disabled={true}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default RouteDetails;
