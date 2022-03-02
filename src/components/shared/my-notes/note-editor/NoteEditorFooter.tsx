import React, { FC } from 'react';
import { Box, Button, Chip, Input } from '@mui/material';
import NoteEditorLabels from './NoteEditorLabels';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  labels: string[];
  setLabels: any;
};

const NoteEditorFooter: FC<Props> = ({ labels, setLabels }) => {
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
};

export default NoteEditorFooter;
