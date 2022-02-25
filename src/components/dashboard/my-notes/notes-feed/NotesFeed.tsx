import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getNotes, selectAllNotes } from '../notesSlice';
import Spinner from '../../../Spinner';
import Note from '../Note';
import { List, Divider, ListItem } from '@mui/material';
import NoteSearchForm from './NoteSearchForm';
import NotesList from './NotesList';
import { selectUser } from '../../../auth/authSlice';

const NotesFeed: FC = () => {
  const dispatch = useAppDispatch();

  const notes = useAppSelector(selectAllNotes);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.status === 'authorized' && notes.notesStatus === 'idle') {
      dispatch(getNotes());
    }
  }, [dispatch, notes.notesStatus]);
  // TODO: fix warning 'Warning: Cannot update a component (`NotesFeed`) while rendering a different component (`Dashboard`). To locate the bad setState() call inside `Dashboard`'

  let content;

  if (notes.notesStatus === 'loading') {
    content = <Spinner />;
  } else if (notes.notesStatus === 'succeeded') {
    content = (
      <>
        <ListItem sx={{ p: 0 }}>
          <NoteSearchForm />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <NotesList />
      </>
    );
  }

  console.log(notes);

  return <List sx={{ width: '30%', minWidth: '250px', py: 0 }}>{content}</List>;
};

// TODO: add notes pagination or scrollable notes feed
// TODO: add active drawer item

export default NotesFeed;
