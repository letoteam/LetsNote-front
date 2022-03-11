import React, { FC, useEffect } from 'react';
import {
  getNotes,
  getPublicNotes,
  getUserNotes,
  selectAllNotes,
  setFilteredNotesByLabel,
} from '../../../../app/slices/notesSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../app/slices/authSlice';
import Note from './Note';
import { Typography } from '@mui/material';
import NotesFeedContainer from './NotesFeedContainer';
import { useParams, useSearchParams } from 'react-router-dom';
import { INote } from '../../../../models/INote';
import PublicNote from './PublicNote';

type Props = {
  notesType: 'public' | 'personal' | 'foreign';
  userId?: number;
};

const NotesList: FC<Props> = ({ notesType, userId }) => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const label = searchParams.get('label');

  const user = useAppSelector(selectUser);
  const notes = useAppSelector(selectAllNotes);

  useEffect(() => {
    if (user.status === 'authorized' && notes.notesStatus === 'idle') {
      if (notesType === 'public') {
        dispatch(getPublicNotes());
      } else if (notesType === 'personal') {
        dispatch(getNotes());
      } else if (notesType === 'foreign' && userId) {
        dispatch(getUserNotes(userId));
      }
    }
  }, [dispatch, notes.notesStatus]);

  useEffect(() => {
    if (label) {
      dispatch(setFilteredNotesByLabel(label));
    }
  }, [label]);

  const Notes = () => {
    if (notes.filteredNotes !== null) {
      if (notes.filteredNotes.length > 0) {
        return (
          <NotesFeedContainer>
            {/*<Link></Link>*/}
            {notes.filteredNotes.map((note) => (
              <Note note={note} key={note.id} />
            ))}
          </NotesFeedContainer>
        );
      } else {
        return (
          <NotesFeedContainer>
            <Typography
              sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}
            >
              Nothing was found
            </Typography>
          </NotesFeedContainer>
        );
      }
    } else if (notesType === 'public') {
      if (notes.publicNotes.length !== 0) {
        return (
          <NotesFeedContainer>
            {notes.publicNotes.map((note) => (
              <PublicNote note={note} key={note.id} />
            ))}
          </NotesFeedContainer>
        );
      } else {
        return (
          <NotesFeedContainer>
            <Typography
              sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}
            >
              No public notes
            </Typography>
          </NotesFeedContainer>
        );
      }
    } else if (notesType === 'personal') {
      if (notes.notes.length !== 0) {
        return (
          <NotesFeedContainer>
            {notes.notes.map((note) => (
              <Note note={note} key={note.id} />
            ))}
          </NotesFeedContainer>
        );
      } else {
        return (
          <NotesFeedContainer>
            <Typography
              sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}
            >
              You don't have any notes yet
            </Typography>
          </NotesFeedContainer>
        );
      }
    } else {
      if (notes.userNotes.length !== 0) {
        return (
          <NotesFeedContainer>
            {notes.userNotes.map((note) => (
              <PublicNote note={note} key={note.id} />
            ))}
          </NotesFeedContainer>
        );
      } else {
        return (
          <NotesFeedContainer>
            <Typography
              sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}
            >
              This user haven't any public notes
            </Typography>
          </NotesFeedContainer>
        );
      }
    }
  };
  return <Notes />;
};

export default NotesList;
