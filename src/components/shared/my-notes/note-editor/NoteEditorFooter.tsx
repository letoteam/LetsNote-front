import React, { FC } from 'react';
import { Box, Button, Chip, Input } from '@mui/material';
import NoteEditorLabels from './NoteEditorLabels';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  readonly?: true;
  labels: string[];
  setLabels?: any;
};

const NoteEditorFooter: FC<Props> = ({ labels, setLabels, readonly }) => {
  if (!readonly) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <NoteEditorLabels labels={labels} setLabels={setLabels} />

        <Button variant="contained" type={'submit'}>
          Save
        </Button>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <NoteEditorLabels labels={labels} disableDelete />
      </Box>
    );
  }
};

export default NoteEditorFooter;
