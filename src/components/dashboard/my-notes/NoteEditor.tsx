import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteEditableNoteLabel,
  getLabels,
  IEditableNote,
  selectNoteById,
  setEditableNote,
  setEditableNoteContent,
  setEditableNoteProp,
  setEditableNoteTitle,
  setNoteProp,
  toggleEditableNotePrivacy,
} from '../notesSlice';
import NoteOptionsButton from './NoteOptionsButton';
import NotePrivacyButton from './NotePrivacyButton';
import { useParams } from 'react-router-dom';

const NoteEditor: FC = () => {
  const dispatch = useAppDispatch();
  const noteId = Number(useParams().noteId);
  const note = useAppSelector((state) => selectNoteById(state, noteId));

  const [title, setTitle] = useState(note?.title);
  useEffect(() => {
    setTitle(note?.title);
  }, [noteId]);

  const onTitleChanged = (e: any) => setTitle(e.target.value);

  let noteDate: string;
  if (note?.updatedAt) noteDate = note.updatedAt.split('T')[0];
  else {
    const date = new Date();
    noteDate = `${date.getFullYear()}-${
      date.getMonth() < 10 ? '0' : ''
    }${date.getMonth()}-${date.getDay() < 10 ? '0' : ''}${date.getDay()}`;
  }

  const EditorContainer = styled('form')(({ theme }) => ({
    marginLeft: '2rem',
    flexGrow: 1,
  }));

  const EditorHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));

  const UpdateDate = () => {
    return (
      <Divider variant={'fullWidth'} textAlign={'left'}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            fontSize: '0.7rem',
            mr: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          {noteDate}
        </Typography>
      </Divider>
    );
  };

  const options = [
    {
      name: 'Save',
      iconElement: <SaveOutlinedIcon />,
      cb: function () {
        console.log('asalalaa');
      },
    },
    {
      name: 'Remove',
      iconElement: <DeleteOutlineOutlinedIcon />,
      cb: () => {
        console.log('asdasd');
      },
    },
  ];

  return (
    <EditorContainer>
      <EditorHeader>
        <Input
          placeholder="Untitled"
          fullWidth
          multiline
          // autoFocus
          disableUnderline
          value={title}
          sx={{
            fontSize: '2rem',
            p: 0,
            borderBottom: 0,
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <Box sx={{ display: 'flex' }}>
          <NotePrivacyButton
            size={'small'}
            isPrivate={note?.isPrivate}
            callback={() => {
              dispatch(toggleEditableNotePrivacy());
            }}
          />
          <NoteOptionsButton options={options} size={'medium'} />
        </Box>
      </EditorHeader>

      <UpdateDate />

      <Input
        placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
        value={note?.content}
        fullWidth
        multiline
        disableUnderline
        sx={{
          height: '300px',
          alignItems: 'flex-start',
          color: 'grey.700',
        }}
        onChange={(e) => {
          dispatch(setEditableNoteContent(e.target.value));
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {note?.labels.map((label) => (
            <Chip
              key={label.id}
              label={label.title}
              sx={{ mr: 1 }}
              onDelete={() => {
                dispatch(deleteEditableNoteLabel(label.id));
              }}
            />
          ))}
          <Input placeholder="Add Label" disableUnderline />
        </Box>

        <Button variant="contained">Save</Button>
      </Box>
    </EditorContainer>
  );
};

export default NoteEditor;
