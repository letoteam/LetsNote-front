import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  setFilteredNotesBySearch,
  setNullableFilteredNotes,
} from '../../../pages/dashboard/my-notes/notesSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { Box, Input } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const NoteSearchForm: FC = () => {
  const dispatch = useAppDispatch();
  const { control, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const searchNote = (search: string) => {
    if (search === '') {
      dispatch(setNullableFilteredNotes());
    } else {
      dispatch(setFilteredNotesBySearch(search));
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
      <form>
        <Controller
          name={'search'}
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Input
                name={'search'}
                id="search"
                placeholder="Search... "
                fullWidth
                disableUnderline
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value;
                  setValue('search', value);
                  searchNote(value);
                }}
              />
            );
          }}
        />
      </form>
    </Box>
  );
};

export default NoteSearchForm;
