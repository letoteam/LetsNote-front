import React, { FC, useEffect, useState } from 'react';
import { Box, Chip, Input } from '@mui/material';
import { ILabel } from '../../../../models/ILabel';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { selectNoteById } from '../../../../app/slices/notesSlice';
import { useForm, Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  labels: string[] | undefined;
  setLabels?: any;
  disableDelete?: true;
};

const NoteEditorLabels: FC<Props> = ({ labels, setLabels, disableDelete }) => {
  const noteId = Number(useParams().noteId);
  const note = useAppSelector((state) => selectNoteById(state, noteId));

  const { control, setValue } = useForm({
    defaultValues: {
      newLabel: '',
    },
  });

  // console.log('labels:', labels);

  // useEffect(() => {
  //   if (note && note?.labels?.length > 0) {
  //     setLabels(note?.labels.map((label: ILabel) => label.title));
  //   }
  //   if (!noteId) {
  //     setLabels([]);
  //   }
  // }, [note, noteId]);

  const onLabelAdding = (e: any) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      if (!labels?.includes(e.target.value) && e.target?.value !== '') {
        let newLabels: string[];
        if (labels) {
          newLabels = [...labels, e.target.value];
        } else {
          newLabels = [e.target.value];
        }
        setLabels(newLabels);
        setValue('newLabel', '');
      }
    }
  };

  const onLabelDelete = (labelForRemove: string) => {
    if (labels) {
      const newLabels = labels.filter((label) => label !== labelForRemove);
      setLabels(newLabels);
    }
  };

  if (!disableDelete) {
    return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '75%' }}>
          {labels?.map((label, key: number) => (
            <Chip
              key={key}
              label={label}
              sx={{ mr: 1, mb: 1 }}
              onDelete={(e) => {
                onLabelDelete(label);
              }}
            />
          ))}
        </Box>
        <form>
          <Controller
            name={'newLabel'}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  placeholder="Add Label"
                  disableUnderline
                  onKeyDown={onLabelAdding}
                  sx={{ mr: 1 }}
                />
              );
            }}
          />
        </form>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '75%' }}>
          {labels?.map((label, key: number) => (
            <Chip key={key} label={label} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
      </Box>
    );
  }
};

export default NoteEditorLabels;
