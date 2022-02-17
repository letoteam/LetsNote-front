import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getNotes, selectAllNotes } from '../notesSlice';
import Spinner from '../../Spinner';
import Note from './Note';
import { List, Divider, ListItem, Box, Input } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { selectUser } from '../../auth/authSlice';
import styled from '@emotion/styled';

const NotesFeed: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const notes = useAppSelector(selectAllNotes);

  const SearchNoteInput = () => {
    return (
      <ListItem sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '56px',
          }}
        >
          <SearchRoundedIcon sx={{ color: 'action.active', mr: 1 }} />
          <Input
            id="search-note-input"
            placeholder="Search... "
            fullWidth
            disableUnderline
            // sx={{fontSize: '1.5rem'}}
          />
        </Box>
      </ListItem>
    );
  };

  useEffect(() => {
    if (user.status === 'authorized' && notes.notesStatus === 'idle') {
      dispatch(getNotes());
    }
  }, [dispatch, notes.notesStatus]);

  let content;
  const NotesContainer = styled('div')(({ theme }) => ({
    maxHeight: '70vh',
    overflow: 'auto',
  }));

  if (notes.notesStatus === 'loading') {
    content = (
      <>
        <SearchNoteInput />
        <Divider variant="fullWidth" component="li" />
        <Spinner />
      </>
    );
    // setTimeout(()=> {}, 1000)
  } else if (notes.notesStatus === 'succeeded' && notes.notes.length > 0) {
    content = (
      <>
        <SearchNoteInput />
        <Divider variant="fullWidth" component="li" />
        <NotesContainer>
          {notes.notes.map((note) => (
            <Note note={note} key={note.id} />
          ))}
        </NotesContainer>
      </>
    );
  }

  return <List sx={{ width: '30%', minWidth: '250px', py: 0 }}>{content}</List>;
};

// TODO: add notes pagination or scrollable notes feed
// TODO: add active drawer item

export default NotesFeed;
