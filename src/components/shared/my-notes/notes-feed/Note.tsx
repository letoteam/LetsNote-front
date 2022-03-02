import React from 'react';
import { INote } from '../../../../models/INote';
import {
  Box,
  Divider,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import NoteOptionsButton from '../NoteOptionsButton';
import NotePrivacyButton from '../NotePrivacyButton';
import { useAppDispatch } from '../../../../app/hooks';
import {
  deleteNote,
  toggleNotePrivacy,
} from '../../../pages/dashboard/my-notes/notesSlice';
import { ILabel } from '../../../../models/ILabel';
import { useNavigate } from 'react-router-dom';
import NoteLabels from './NoteLabels';

type props = {
  note: INote;
};

const Note = ({ note }: props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const options = [
    // {
    //     name: 'View',
    //     iconElement: <VisibilityIcon fontSize={"small"}/>,
    //     cb: function(){
    //         dispatch(setEditableNote(note));
    //     }
    // },
    {
      name: 'Edit',
      iconElement: <EditIcon fontSize={'small'} />,
      onClick: () => {
        navigate(`/app/note/${note.id}`);
        // dispatch(setEditableNote(note));
      },
    },
    {
      name: 'Remove',
      iconElement: <DeleteOutlineOutlinedIcon fontSize={'small'} />,
      onClick: () => {
        dispatch(deleteNote(note.id));
      },
    },
  ];

  const updateDate = note.updatedAt.split('T')[0];

  let shortTitle: string;
  let shortContent: string;
  if (note.title.length > 18) shortTitle = note.title.substring(0, 18) + '...';
  else shortTitle = note.title;
  if (note.content.length > 100)
    shortContent = note.content.substring(0, 98) + '...';
  else shortContent = note.content;

  const ListItemPrimary = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        component="h4"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {shortTitle}
        <NotePrivacyButton
          size={'small'}
          isPrivate={note.isPrivate}
          callback={function (e: Event) {
            e.stopPropagation();
            dispatch(toggleNotePrivacy(note.id));
          }}
        />
      </Typography>

      <NoteOptionsButton options={options} size={'small'} />
    </Box>
  );

  const ListItemSecondary = () => (
    <Box>
      <Typography variant="body2" component="span" sx={{ pb: 1 }}>
        {shortContent}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <NoteLabels note={note} />
        <Typography
          variant="caption"
          component="span"
          sx={{
            color: 'text.disabled',
            fontSize: '0.7rem',
            mr: '0.5rem',
            fontWeight: 'bold',
            flexShrink: '0',
          }}
        >
          {updateDate}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          padding: 0,
          userSelect: 'none',
        }}
        onClick={function () {
          // dispatch(setEditableNote(note));
          navigate(`/app/note/${note.id}`);
        }}
      >
        <ListItemText
          primary={<ListItemPrimary />}
          secondary={<ListItemSecondary />}
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
};

export default Note;
