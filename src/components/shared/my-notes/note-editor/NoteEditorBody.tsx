import React, { FC, useEffect } from 'react';
import { Input } from '@mui/material';
import { Control } from 'react-hook-form/dist/types/form';
import { Controller } from 'react-hook-form';
import { ILabel } from '../../../../models/ILabel';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { selectNoteById } from '../../../../app/slices/notesSlice';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  readonly?: true;
  contentValue?: string;
  control?: Control;
  setValue?: any;
};

const NoteEditorBody: FC<Props> = ({
  control,
  setValue,
  readonly,
  contentValue,
}) => {
  // const noteId = Number(useParams().noteId);
  // const note = useAppSelector((state) => selectNoteById(state, noteId));

  // useEffect(() => {
  //   if (note) {
  //     setValue('content', note.content);
  //   } else {
  //     setValue('content', '');
  //   }
  // }, [note, noteId]);

  if (!readonly) {
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
  } else {
    return (
      <Input
        name={'content'}
        value={contentValue}
        readOnly
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
    );
  }
};

export default NoteEditorBody;
