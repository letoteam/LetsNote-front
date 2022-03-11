import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUsers, selectUsers } from '../../../app/slices/usersSlice';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const UsersDataGrid: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      width: 50,
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Username',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'isActivated',
      headerName: 'Is Activated',
      type: 'boolean',
      width: 150,
    },
    {
      field: 'notesNumber',
      headerName: 'Notes',
      width: 100,
      align: 'center',
    },
  ];

  const users = useAppSelector(selectUsers);

  useEffect(function () {
    // if (users.status === 'idle') {
    dispatch(getUsers());
    // }
  }, []);

  if (users.status === 'loading') {
    return (
      <Box
        sx={{
          width: '100%',
          height: '60vh',
          d: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner />
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={users.data}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[5, 10, 15]}
          disableSelectionOnClick
          isRowSelectable={() => false}
          onRowClick={(params) => navigate(`/app/users/${params.id}`)}
        />
      </Box>
    );
  }
};

export default UsersDataGrid;
