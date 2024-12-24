import React from 'react';
import { TextField, Grid,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  value: string;
  onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}

const SearchInput = ( { value, onChange } : SearchInputProps ) => {
  return (
    <Grid container justifyContent="center" style={{ marginBottom: '20px' }}>
      <TextField
        fullWidth
        placeholder="Search ..."
        variant="outlined"
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}

      />
    </Grid>
  );
};

export default SearchInput;
 