import React, { FC, useEffect } from 'react';
import DashboardHeader from '../../../application/header/DashboardHeader';
import MyNotesHeaderComponent from '../../../shared/my-notes/MyNotesHeaderComponent';
import { Box, Divider } from '@mui/material';
import { getPublicNotes } from '../../../../app/slices/notesSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../app/slices/authSlice';
import NotesViewer from '../../../shared/NotesViewer';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  pageTitle: string;
};

const PublicNotes: FC<Props> = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(function () {
    dispatch(getPublicNotes());
  }, []);

  return (
    <Box>
      <DashboardHeader
        title="Public Notes"
        headerComponent={<MyNotesHeaderComponent />}
      />

      <NotesViewer notesType={'public'} />
    </Box>
  );
};

export default PublicNotes;
