import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  getNotes,
  selectAllNotes,
} from '../../../pages/dashboard/my-notes/notesSlice';
import Spinner from '../../Spinner';
import Note from './Note';
import { List, Divider, ListItem, Box } from '@mui/material';
import NoteSearchForm from './NoteSearchForm';
import NotesList from './NotesList';
import { selectUser } from '../../../pages/auth/authSlice';

const NotesFeed: FC = () => {
  const dispatch = useAppDispatch();

  const notes = useAppSelector(selectAllNotes);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.status === 'authorized' && notes.notesStatus === 'idle') {
      dispatch(getNotes());
    }
  }, [dispatch, notes.notesStatus]);
  // TODO: fix warning 'Warning: Cannot update a component (`NotesFeed`) while rendering a different component (`MyNotes`). To locate the bad setState() call inside `MyNotes`'

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

  return (
    <List sx={{ width: '30%', minWidth: '250px', py: 0, flexShrink: '0' }}>
      {content}
    </List>
  );
};

// TODO: add notes pagination or scrollable notes feed
// TODO: add active drawer item

export default NotesFeed;
