import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUserById } from '../../../../app/slices/usersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import DashboardHeader from '../../../application/header/DashboardHeader';
import MyNotesHeaderComponent from '../../../shared/my-notes/MyNotesHeaderComponent';
import NotesViewer from '../../../shared/NotesViewer';
import { getUserNotes } from '../../../../app/slices/notesSlice';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const UserNotes: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userId = Number(useParams().userId);

  const user = useAppSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    if (user) {
      document.title = `${user.name} Notes`;
    } else {
      navigate('/app/users');
    }
  });

  useEffect(function () {
    dispatch(getUserNotes(userId));
  }, []);

  return (
    <Box>
      <DashboardHeader
        title={`${user?.name} Notes`}
        headerComponent={<MyNotesHeaderComponent />}
      />

      <NotesViewer notesType={'foreign'} />
    </Box>
  );
};

export default UserNotes;
