import { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import Grid from '@mui/material/Grid2';
import CheckIcon from '@mui/icons-material/Check';

import Map from './Map.tsx';


import { formatDistance } from '../helpers';
import { MarkerData } from '../store/routesSlice.ts';

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
  const [ formValues, setFormValues ] = useState( {
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

  useEffect( () => {
    if ( !open ) {
      setFormValues( { title: '', shortDescription: '', fullDescription: '', length: 0, markers: [],  favorite: false } );
      setFormErrors( { title: '', shortDescription: '', fullDescription: '', markers: '' } );
    }
  }, [ open ] );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery( theme.breakpoints.down( 'sm' ) );

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
      errors.markers = 'Marker is required';
    }

    setFormErrors( errors );
    return Object.keys( errors ).length === 0;
  };

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if ( validateForm() ) {
      onAddRoute( formValues );
      onClose( false );
    }
  };

  const handleAddMarker = ( newMarker: any, newLenght: number ) => {
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

  return (
    <Dialog
      open={open}
      onClose={() => onClose( false )}
      maxWidth="lg"
      fullWidth
      fullScreen={isSmallScreen}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add New Path</Typography>
          <IconButton onClick={() => onClose( false )} size="small">
            <ClearIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider orientation="horizontal"  flexItem/>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              size={{ xs: 12, md: 5.85 }}

            >
              <Box marginBottom="15px">
                <Typography variant="subtitle1">Title</Typography>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  placeholder="Enter route title"
                  error={!!formErrors.title}
                  helperText={formErrors.title}
                />
              </Box>
              <Box marginBottom="15px">
                <Typography variant="subtitle1">Short Description</Typography>
                <TextField
                  fullWidth
                  id="shortDescription"
                  name="shortDescription"
                  value={formValues.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Enter a short description"
                  multiline
                  rows={3}
                  error={!!formErrors.shortDescription}
                  helperText={formErrors.shortDescription}
                  inputProps={{
                    maxLength: 120,
                  }}
                />
                <Box display="flex" justifyContent="flex-end" marginTop="5px">
                  <Typography variant="body2">{`Limit ${ formValues.shortDescription.length } of 120`}</Typography>
                </Box>
              </Box>

              <Box className="mb-15">
                <Typography variant="subtitle1">Full Description</Typography>
                <TextField
                  fullWidth
                  id="fullDescription"
                  name="fullDescription"
                  value={formValues.fullDescription}
                  onChange={handleInputChange}
                  placeholder="Enter a detailed description"
                  multiline
                  rows={6}
                  error={!!formErrors.fullDescription}
                  helperText={formErrors.fullDescription}
                />
              </Box>
              <Box className="flex-center mb-15">
                <MapIcon />
                <Typography variant="h6">
                  Length {formatDistance( formValues.length )}
                </Typography>
              </Box>

              <Box className="flex-center">
                <Button
                  variant="outlined"
                  startIcon={<CheckIcon />}
                  color="success"
                  type="submit"
                >
                    Add Path
                </Button>
              </Box>
            </Grid>
            <Divider
              orientation={isSmallScreen ? 'horizontal' : 'vertical'}
              flexItem
            />
            <Grid
              size={{ xs: 12, md: 5.85 }}
            >
              <Map
                markers={formValues.markers}
                isEditing={true}
                onMarkersChange={handleAddMarker}
              />
              {!!formErrors.markers &&
                  <Typography
                    variant="body2"
                    color="error"
                    marginTop="10px"
                  >
                    {formErrors.markers}
                  </Typography>}
            </Grid>

          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );

};

export default AddRouteModal;
