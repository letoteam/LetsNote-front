import React, { FC, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import DashboardHeader from '../../../application/header/DashboardHeader';
import MyNotesHeaderComponent from '../../../shared/my-notes/MyNotesHeaderComponent';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getPublicNotes } from '../../../../app/slices/notesSlice';
import { selectUser } from '../../../../app/slices/authSlice';
import UsersDataGrid from '../../../shared/users/UsersDataGrid';

type Props = {
  pageTitle: string;
};

const UsersPage: FC<Props> = ({ pageTitle }) => {
  useEffect(() => {
    document.title = 'Users - MyNotes';
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(
    function () {
      dispatch(getPublicNotes());
    },
    [user.data.id]
  );

  // const users = useAppSelector(selectUsers)

  return (
    <Box>
      <DashboardHeader
        title="All Users"
        headerComponent={<MyNotesHeaderComponent />}
      />

      <UsersDataGrid />
    </Box>
  );
};

export default UsersPage;
