import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Input,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  createNote,
  CreateNoteData,
  selectNoteById,
  setNoteProp,
  updateNote,
  UpdateNoteData,
} from '../notesSlice';
import NoteOptionsButton from './NoteOptionsButton';
import NotePrivacyButton from './NotePrivacyButton';
import { useParams } from 'react-router-dom';
import { ILabel } from '../../../models/ILabel';
import { INote } from '../../../models/INote';

type Maybe<T> = T | undefined;

const NoteEditor: FC = () => {
  const noteId = Number(useParams().noteId);
  const note = useAppSelector((state) => selectNoteById(state, noteId));
  console.log('note: ', note);

  const [title, setTitle] = useState(note?.title);
  const [isPrivate, setIsPrivate] = useState(note?.isPrivate);
  const [content, setContent] = useState(note?.content);
  const [labels, setLabels] = useState<string[]>(
    note && note?.labels?.length > 0
      ? note?.labels.map((label: ILabel) => label.title)
      : []
  );

  useEffect(() => {
    console.log('note effect: ', note);
    setTitle(note?.title);
    setIsPrivate(note?.isPrivate);
    setContent(note?.content);
    if (note && note?.labels?.length > 0) {
      setLabels(note?.labels.map((label: ILabel) => label.title));
    }
  }, [note, noteId]);

  useEffect(() => {
    if (!note) {
      setIsPrivate(true);
    } else {
      setIsPrivate(note?.isPrivate);
    }
  }, [note?.isPrivate]);

  useEffect(() => {
    if (!note) {
      setIsPrivate(true);
      setLabels([]);
    }
  }, []);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onPrivacyToggle = (e: MouseEvent) => setIsPrivate(!isPrivate);
  const onContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const onLabelAdding = (e: any) => {
    if (e.key == 'Enter') {
      if (!labels?.includes(e.target.value) && e.target?.value !== '') {
        let newLabels: string[];
        if (labels) {
          newLabels = [...labels, e.target.value];
        } else {
          newLabels = [e.target.value];
        }
        setLabels(newLabels);
      }
    }
  };
  const onLabelDelete = (labelForRemove: string) => {
    if (labels) {
      console.log(labelForRemove);
      const newLabels = labels.filter((label) => label !== labelForRemove);
      setLabels(newLabels);
    }
  };

  const dispatch = useAppDispatch();
  const onNoteSave = () => {
    if (!note) {
      if (
        title !== undefined &&
        isPrivate !== undefined &&
        content !== undefined &&
        labels !== undefined
      ) {
        console.log(labels !== undefined);
        const data: CreateNoteData = {
          title,
          isPrivate,
          content,
          labels,
        };
        dispatch(createNote(data));
      }
    } else {
      if (
        title !== undefined &&
        isPrivate !== undefined &&
        content !== undefined &&
        labels !== undefined
      ) {
        const data: UpdateNoteData = {
          id: note.id,
          title,
          isPrivate,
          content,
          labels,
        };
        dispatch(updateNote(data));
      }
    }
  };

  const EditorContainer = styled('form')(({ theme }) => ({
    marginLeft: '2rem',
    flexGrow: 1,
  }));

  const EditorHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));

  let noteDate: string;
  if (note?.updatedAt) noteDate = note.updatedAt.split('T')[0];
  else {
    const date = new Date();
    noteDate = `${date.getFullYear()}-${
      date.getMonth() < 10 ? '0' : ''
    }${date.getMonth()}-${date.getDay() < 10 ? '0' : ''}${date.getDay()}`;
  }
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
      onClick: function () {
        console.log('asalalaa');
      },
    },
    {
      name: 'Remove',
      iconElement: <DeleteOutlineOutlinedIcon />,
      onClick: () => {
        console.log('asdasd');
      },
    },
  ];
  console.log('rendeing...');

  return (
    <EditorContainer>
      <EditorHeader>
        <FormControl>
          <Input
            key={'title'}
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
              e.preventDefault();
              e.stopPropagation();
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <Box sx={{ display: 'flex' }}>
          <NotePrivacyButton
            size={'small'}
            isPrivate={isPrivate}
            callback={onPrivacyToggle}
          />
          <NoteOptionsButton options={options} size={'medium'} />
        </Box>
      </EditorHeader>

      <UpdateDate />

      <Input
        placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
        value={content}
        fullWidth
        multiline
        disableUnderline
        sx={{
          height: '300px',
          alignItems: 'flex-start',
          color: 'grey.700',
        }}
        onChange={onContentChange}
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
          {labels?.map((label, key: number) => (
            <Chip
              key={key}
              label={label}
              sx={{ mr: 1 }}
              onDelete={(e) => {
                onLabelDelete(label);
              }}
            />
          ))}

          <Input
            placeholder="Add Label"
            disableUnderline
            onKeyDown={onLabelAdding}
          />
        </Box>

        <Button variant="contained" onClick={onNoteSave}>
          Save
        </Button>
      </Box>
    </EditorContainer>
  );
};

export default NoteEditor;
