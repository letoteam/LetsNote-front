import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { setNullSearchedNotes, setSearchedNotes } from '../notesSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { Box, Input } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const NoteSearchForm: FC = () => {
  const dispatch = useAppDispatch();
  // const { control, setValue } = useForm({
  //   defaultValues: {
  //     search: '',
  //   },
  // });

  const [searchInputValue, setSearchInputValue] = useState('');

  const searchNote = (search: string) => {
    if (search === '') {
      dispatch(setNullSearchedNotes());
    } else {
      dispatch(setSearchedNotes(search));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '56px',
      }}
    >
      <SearchRoundedIcon sx={{ color: 'action.active', mr: 1 }} />
      {/*<form>*/}
      {/*  <Controller*/}
      {/*    name={'search'}*/}
      {/*    control={control}*/}
      {/*    rules={{ required: true }}*/}
      {/*    render={({ field, fieldState }) => {*/}
      {/*      console.log('field: ', field, fieldState);*/}
      {/*      return (*/}
      <Input
        name={'search'}
        id="search"
        placeholder="Search... "
        fullWidth
        disableUnderline
        value={searchInputValue}
        onChange={(e) => {
          const value = e.target.value;
          // setValue('search', value);
          setSearchInputValue(value);
          searchNote(value);
        }}
        // sx={{fontSize: '1.5rem'}}
      />
      {/*      );*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</form>*/}
    </Box>
  );
};

export default NoteSearchForm;
