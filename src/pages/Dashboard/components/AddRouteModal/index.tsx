import { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { FaMapMarkedAlt } from 'react-icons/fa';

import { formatDistance } from '@/helpers';
import { MarkerData } from '@/store/routesSlice.ts';

import CustomInput from '@components/CustomInput';
import TextArea from '@components/TextArea';
import Divider from '@components/Divider';
import Button from '@components/Button';
import Map from '@/components/Map.tsx';

import styles from './index.module.css';

export interface AddRoute {
    title: string;
    shortDescription: string;
    fullDescription: string;
    length: number;
    favorite: boolean;
    markers: MarkerData[];
}

interface Props {
    onClose: ( b: boolean ) => void;
    open: boolean;
    onAddRoute: ( route: AddRoute ) => void ;
}


const AddRouteModal = ( { onClose, open, onAddRoute }: Props ) => {
  const [ formValues, setFormValues ] = useState<AddRoute>( {
    title: '',
    shortDescription: '',
    fullDescription: '',
    favorite: false,
    length: 0,
    markers: []
  } );
  const [ formErrors, setFormErrors ] = useState<Record<string, string | undefined> >( {
    title: '',
    shortDescription: '',
    fullDescription: '',
    markers: '',
  } );
  const [ isSmallScreen, setIsSmallScreen ] = useState( false );

  useEffect( () => {
    if ( !open ) {
      setFormValues( { title: '', shortDescription: '', fullDescription: '', length: 0, markers: [],  favorite: false } );
      setFormErrors( { title: '', shortDescription: '', fullDescription: '', markers: '' } );
    }
  }, [ open ] );

  
  const checkScreenSize = () => {
    setIsSmallScreen( window.innerWidth < 900 );
    console.log( window.innerWidth );
  };

  useEffect( () => {
    checkScreenSize();
    window.addEventListener( 'resize', checkScreenSize );
    return () => window.removeEventListener( 'resize', checkScreenSize );
  }, [] );

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setFormValues( ( prev ) => ( {
      ...prev,
      [name]: value,
    } ) );

    setFormErrors( ( prev ) => ( {
      ...prev,
      [name]: '',
    } ) );
  };

  const validateForm = () => {
    const errors: Record<string, string | undefined> = {};

    if ( !formValues.title.trim() ) {
      errors.title = 'Title is required';
    }
    if ( !formValues.shortDescription.trim() ) {
      errors.shortDescription = 'Short description is required';
    } else if ( formValues.shortDescription.length > 120 ) {
      errors.shortDescription = 'Short description cannot exceed 120 characters';
    }
    if ( !formValues.fullDescription.trim() ) {
      errors.fullDescription = 'Full description is required';
    }
    if ( formValues.markers.length < 1 ) {
      errors.markers = 'At least one marker is required';
    }

    setFormErrors( errors );
    return Object.keys( errors ).length === 0;
  }; 

  const handleSubmit = ( e?: React.FormEvent<HTMLFormElement> ) => {
    e?.preventDefault();

    if ( validateForm() ) {
      onAddRoute( formValues );
      onClose( false );
    }
  };

  const handleAddMarker = ( newMarker: MarkerData[], newLenght: number ) => {
    setFormValues( ( prev ) => ( {
      ...prev,
      length: newLenght,
      markers: newMarker,
    } ) );

    setFormErrors( ( prev ) => ( {
      ...prev,
      markers: '',
    } ) );
  };

  const modalRef = useRef<HTMLDivElement>( null ); // Создаем ref для модального окна

  const handleClickOutside = ( event: MouseEvent ) => {
    if ( modalRef.current && !modalRef.current.contains( event.target as Node ) ) {
      onClose( false );
    }
  };

  useEffect( () => {
    if ( open ) {
      document.addEventListener( 'mousedown', handleClickOutside );
    } else {
      document.removeEventListener( 'mousedown', handleClickOutside );
    }
    return () => {
      document.removeEventListener( 'mousedown', handleClickOutside );
    };
  }, [ open ] );

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content} ref={modalRef}>
        <div className={styles.modal_header}>
          <h6>Add New Path</h6>
          <div>
            <Button
              onClick={() => onClose( false )}
              variant='icon'
              icon={<IoIosClose/>}
            />
          </div>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={handleSubmit} className={styles.modal_form}>
            <div className={styles.form_fields}>
              <CustomInput
                label="Title"
                name="title"
                value={formValues.title}
                placeholder="Enter route title"
                error={formErrors.title}
                onChange={handleInputChange}
              />
              <TextArea
                label="Short Description"
                value={formValues.shortDescription}
                onChange={handleInputChange}
                placeholder="Enter a short description"
                name="shortDescription"
                error={formErrors.shortDescription}
                maxLength={160}
                rows={4}
              />
              <TextArea
                label="Full Description"
                value={formValues.fullDescription}
                onChange={handleInputChange}
                placeholder="Enter a detailed description"
                name="fullDescription"
                error={formErrors.fullDescription}
                rows={isSmallScreen ? 8 : 12}
              />
            </div>

            {!isSmallScreen && <div>
              <div className={styles.distance}>
                <FaMapMarkedAlt/>
                <span>
                Length {formatDistance( formValues.length )}
                </span>
              </div>

              <Button variant="primary">
                      Add Path
              </Button>
            </div> }
          </form>
          <Divider orientation={isSmallScreen ? 'horizontal' : 'vertical'}/>
          <div className={styles.modal_map}>
            <Map
              markers={formValues.markers}
              isEditing={true}
              onMarkersChange={handleAddMarker}
              textError={formErrors.markers}
            />
          </div>
          {isSmallScreen &&
              <div>
                <div className={styles.distance}>
                  <FaMapMarkedAlt/>
                  <span>
                Length {formatDistance( formValues.length )}
                  </span>
                </div>
                <Button variant="primary" onClick={handleSubmit}>
                      Add Path
                </Button>
              </div>
          }
        </div>
      </div>
    </div>
  )
  ;

};

export default AddRouteModal;
 