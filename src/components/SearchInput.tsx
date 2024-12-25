import React from 'react';
import { TextField,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


interface SearchInputProps {
  value: string;
  onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}

const SearchInput = ( { value, onChange } : SearchInputProps ) => {
  return (
    <div className="search">
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
    </div>
  );
};

export default SearchInput;
 