import React, { FC, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Input } from '@mui/material';
import NotePrivacyButton from '../NotePrivacyButton';
import NoteOptionsButton from '../NoteOptionsButton';
import styled from '@emotion/styled';
import { Control, UseFormSetValue } from 'react-hook-form/dist/types/form';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteNote, selectNoteById } from '../../../../app/slices/notesSlice';
import { INote } from '../../../../models/INote';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { ILabel } from '../../../../models/ILabel';

type Props = {
  readonly?: true;
  titleValue?: string;
  control?: Control;
  note?: INote | undefined;
  isPrivate?: boolean | undefined;
  setIsPrivate?: any;
};

const NoteEditorHeader: FC<Props> = ({
  control,
  note,
  isPrivate,
  setIsPrivate,
  readonly,
  titleValue,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const EditorHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));

  const optionButtonItems = [
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

  if (!readonly) {
    return (
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
            callback={() => {
              setIsPrivate(!isPrivate);
            }}
          />

          <NoteOptionsButton options={optionButtonItems} size={'medium'} />
        </Box>
      </EditorHeader>
    );
  } else {
    return (
      <EditorHeader>
        <Input
          name="title"
          value={titleValue}
          // disabled
          readOnly
          placeholder="Untitled"
          fullWidth
          multiline
          // autoFocus
          disableUnderline
          sx={[
            {
              fontSize: '2rem',
              p: 0,
              borderBottom: 0,
            },
          ]}
        />
      </EditorHeader>
    );
  }
};

export default NoteEditorHeader;
