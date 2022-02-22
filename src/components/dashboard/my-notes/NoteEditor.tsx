import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Input,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  createNote,
  deleteNote,
  NoteData,
  selectNoteById,
  updateNote,
} from './notesSlice';
import NoteOptionsButton from './NoteOptionsButton';
import NotePrivacyButton from './NotePrivacyButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, set } from 'react-hook-form';
import { ILabel } from '../../../models/ILabel';
import { selectUser } from '../../auth/authSlice';

const NoteEditor: FC = () => {
  const noteId = Number(useParams().noteId);
  const note = useAppSelector((state) => selectNoteById(state, noteId));
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  if (noteId && !note) {
    navigate('/app');
  }

  const [isPrivate, setIsPrivate] = useState(note?.isPrivate);
  const [labels, setLabels] = useState<string[]>(
    note && note?.labels?.length > 0
      ? note?.labels.map((label: ILabel) => label.title)
      : []
  );

  useEffect(() => {
    setIsPrivate(note?.isPrivate);
    if (note && note?.labels?.length > 0) {
      setLabels(note?.labels.map((label: ILabel) => label.title));
    }
    if (note) {
      setValue('title', note.title);
      setValue('content', note.content);
    } else {
      setValue('title', '');
      setValue('content', '');
    }
  }, [note, noteId]);

  useEffect(() => {
    if (!note) {
      setIsPrivate(true);
      setLabels([]);
    }
  }, []);

  useEffect(() => {
    if (!note) {
      setIsPrivate(true);
    } else {
      setIsPrivate(note?.isPrivate);
    }
  }, [note?.isPrivate]);

  const { handleSubmit, control, setValue } = useForm();

  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    if (!note) {
      const noteData: NoteData = {
        title: data.title,
        content: data.content,
        isPrivate,
        labels,
      };
      dispatch(createNote(noteData));
    } else {
      const noteData: NoteData = {
        id: note.id,
        title: data.title,
        content: data.content,
        isPrivate,
        labels,
      };
      dispatch(updateNote(noteData));
    }
    navigate('/app');
    setValue('title', '');
    setValue('content', '');
  };
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
      const newLabels = labels.filter((label) => label !== labelForRemove);
      setLabels(newLabels);
    }
  };

  const EditorForm = styled('form')(({ theme }) => ({
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
    // {
    //   name: 'Save',
    //   iconElement: <SaveOutlinedIcon />,
    // },
    {
      name: 'Remove',
      iconElement: <DeleteOutlineOutlinedIcon />,
      onClick: () => {
        if (note) {
          dispatch(deleteNote(note.id));
          navigate('/app');
        }
      },
    },
  ];

  return (
    <EditorForm onSubmit={handleSubmit(onSubmit)}>
      <EditorHeader>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                placeholder="Untitled"
                fullWidth
                multiline
                // autoFocus
                disableUnderline
                sx={{
                  fontSize: '2rem',
                  p: 0,
                  borderBottom: 0,
                }}
              />
            );
          }}
        />

        <Box sx={{ display: 'flex' }}>
          <NotePrivacyButton
            size={'small'}
            isPrivate={isPrivate}
            callback={() => setIsPrivate(!isPrivate)}
          />

          <NoteOptionsButton options={options} size={'medium'} />
        </Box>
      </EditorHeader>

      <UpdateDate />

      <Controller
        name={'content'}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
            fullWidth
            multiline
            disableUnderline
            sx={{
              height: '300px',
              alignItems: 'flex-start',
              color: 'grey.700',
            }}
          />
        )}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/*<Box*/}
        {/*  sx={{*/}
        {/*    display: 'flex',*/}
        {/*    alignItems: 'center',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {labels?.map((label, key: number) => (*/}
        {/*    <Chip*/}
        {/*      key={key}*/}
        {/*      label={label}*/}
        {/*      sx={{ mr: 1 }}*/}
        {/*      onDelete={(e) => {*/}
        {/*        onLabelDelete(label);*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  ))}*/}

        {/*  <Input*/}
        {/*    placeholder="Add Label"*/}
        {/*    disableUnderline*/}
        {/*    onKeyDown={onLabelAdding}*/}
        {/*  />*/}
        {/*</Box>*/}

        <Button variant="contained" type={'submit'}>
          Save
        </Button>
      </Box>
    </EditorForm>
  );
};
export default NoteEditor;
