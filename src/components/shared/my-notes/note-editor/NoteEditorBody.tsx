import React, { FC, useEffect } from 'react';
import { Input } from '@mui/material';
import { Control } from 'react-hook-form/dist/types/form';
import { Controller } from 'react-hook-form';
import { ILabel } from '../../../../models/ILabel';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { selectNoteById } from '../../../pages/dashboard/my-notes/notesSlice';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  control: Control;
  setValue: any;
};

const NoteEditorBody: FC<Props> = ({ control, setValue }) => {
  const noteId = Number(useParams().noteId);
  const note = useAppSelector((state) => selectNoteById(state, noteId));

  // useEffect(() => {
  //   if (note) {
  //     setValue('content', note.content);
  //   } else {
  //     setValue('content', '');
  //   }
  // }, [note, noteId]);

  return (
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
  );
};

export default NoteEditorBody;
