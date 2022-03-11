import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getNotes, selectAllNotes } from '../../../../app/slices/notesSlice';
import Spinner from '../../Spinner';
import { List, Divider, ListItem } from '@mui/material';
import NoteSearchForm from './NoteSearchForm';
import NotesList from './NotesList';
import NotesType from '../../../../models/NotesType';

type Props = {
  notesType: NotesType;
};

const NotesFeed: FC<Props> = ({ notesType }) => {
  const notes = useAppSelector(selectAllNotes);

  // TODO: fix warning 'Warning: Cannot update a component (`NotesFeed`) while rendering a different component (`MyNotes`). To locate the bad setState() call inside `MyNotes`'

  let content;

  if (notes.notesStatus === 'loading') {
    content = <Spinner />;
  } else if (notes.notesStatus === 'succeeded') {
    content = (
      <>
        <ListItem sx={{ p: 0 }}>
          <NoteSearchForm notesType={notesType} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <NotesList notesType={notesType} />
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
