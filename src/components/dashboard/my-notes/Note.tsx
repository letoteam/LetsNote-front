import React from 'react';
import { INote } from '../../../models/INote';
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
import NoteOptionsButton from './NoteOptionsButton';
import NotePrivacyButton from './NotePrivacyButton';
import { useAppDispatch } from '../../../app/hooks';
import { toggleNotePrivacy } from '../notesSlice';
import { ILabel } from '../../../models/ILabel';
import { useNavigate } from 'react-router-dom';

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
        // dispatch(setEditableNote(note));
      },
    },
    {
      name: 'Remove',
      iconElement: <DeleteOutlineOutlinedIcon fontSize={'small'} />,
      onClick: () => {
        console.log('asd');
      },
    },
  ];

  const updateDate = note.updatedAt.split('T')[0];

  let shortContent: string;
  if (note.content.length > 100)
    shortContent = note.content.substring(0, 98) + '...';
  else shortContent = note.content;

  let visibleLabels: ILabel[];
  let hiddenLabels: ILabel[] = [];

  if (note.labels.length <= 3) {
    visibleLabels = note.labels.slice();
  } else {
    visibleLabels = note.labels.slice(0, 3);
    hiddenLabels = note.labels.slice(3);
  }

  const Labels = () => {
    if (hiddenLabels.length > 0) {
      return (
        <Box>
          {visibleLabels.map((label) => (
            <Link
              key={label.id}
              underline="hover"
              variant="body2"
              sx={{ cursor: 'pointer' }}
            >
              #{label.title}
            </Link>
          ))}
          <Link underline="none" variant="body2" sx={{ cursor: 'pointer' }}>
            {' '}
            and {hiddenLabels.length} more...
          </Link>
        </Box>
      );
    } else {
      return (
        <Box>
          {visibleLabels.map((label) => (
            <Link
              key={label.id}
              underline="hover"
              variant="body2"
              sx={{ cursor: 'pointer' }}
            >
              #{label.title}
            </Link>
          ))}
        </Box>
      );
    }
  };

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
        {note.title}
        <NotePrivacyButton
          size={'small'}
          isPrivate={note.isPrivate}
          callback={function (e: Event) {
            e.stopPropagation();
            dispatch(toggleNotePrivacy(note.id));
          }}
        />
        {/*    callback={(e) => {*/}
        {/*    e.stopPropagation();*/}
        {/*    dispatch(toggleNotePrivacy(note.id))*/}
        {/*}}*/}
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
        <Labels />
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            fontSize: '0.7rem',
            mr: '0.5rem',
            fontWeight: 'bold',
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
