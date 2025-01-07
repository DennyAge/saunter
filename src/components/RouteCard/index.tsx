import clsx from 'clsx';
import React from 'react';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { FaChevronRight, FaRegStar, FaStar } from 'react-icons/fa';

import { Route } from '@/store/routesSlice.ts';
import { formatDistance } from '@/helpers';

import styles from './index.module.css';

interface RouteItemProps {
    route: Route;
    selectRouteId: string | null| undefined;
    onFavoriteToggle: ( id: string, favorite: boolean ) => void;
}

const RouteCard = ( {
  route,
  selectRouteId,
  onFavoriteToggle
} : RouteItemProps ) => {

  const handleFavoriteClick = ( e: React.MouseEvent ) => {
    e.stopPropagation();
    onFavoriteToggle( route.id, !route.favorite );
  };

  return (
    <div className={clsx( styles.card_container, { [styles.active] : route.id === selectRouteId } )} >
      <MdOutlineZoomOutMap  className={styles.card_icon}/>
      <div>
        <div className={styles.card_title}>
          <button
            className={styles.favorite_btn}
            onClick={handleFavoriteClick}
          >
            {route.favorite ? <FaStar /> : <FaRegStar />}
          </button>
          <h6>
            {route.title}
          </h6>
        </div>
        <p className={styles.card_text} >
          {route.shortDescription}
        </p>
      </div>
      <span className={styles.text_right}>
        {formatDistance( route.length )}
      </span>

      <div className={styles.text_right}>
        <FaChevronRight />
      </div>
    </div>

  );
};

export default RouteCard;
 