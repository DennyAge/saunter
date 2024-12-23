import React, { useState } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import RouteList from '../components/RouteList.tsx';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const Dashboard = () => {

  const [ searchQuery, setSearchQuery ] = useState( '' );

  const handleSearch = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setSearchQuery( e.target.value );
  };
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
        />
      </Box>
      <Box>
        <div>
          <ZoomOutMapIcon/>
          <div>
            <div>
              <button><StarIcon/></button>
              <h3>title</h3>
            </div>
            <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing.
            </div>

          </div>
          <div>
                  1.75 rm
          </div>
          <KeyboardArrowRightIcon/>
        </div>
      </Box>
    </Container>
  );
};

export default Dashboard;
