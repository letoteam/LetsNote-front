import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, logout } from '../auth/authSlice';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutIcon from '@mui/icons-material/Logout';

type IMenuItem = {
  title: string;
  iconElement: any;
  url: string;
};

const menuItems: IMenuItem[] = [
  // {
  //   title: 'Profile',
  //   iconElement: <PersonRoundedIcon />,
  //   url: '/profile',
  // },
  {
    title: 'My Notes',
    iconElement: <HomeRoundedIcon />,
    url: '/app',
  },
  {
    title: 'Public Notes',
    iconElement: <StickyNote2RoundedIcon />,
    url: '/public-notes',
  },
  {
    title: 'Users',
    iconElement: <GroupRoundedIcon />,
    url: '/users',
  },
];

const drawerWidth = 250;

const DashboardLayout: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('current target', event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'baseline',
  }));

  const ActivationStatusAlert = () => {
    if (user.data.isActivated) {
      return <Alert severity="success">Your account is activated</Alert>;
    } else {
      return (
        <Alert severity="error">
          Your account is not activated! Check your email
        </Alert>
      );
    }
  };

  // const DrawerFooter = styled('footer')(({ theme }) => ({
  //     position: 'relative',
  //     bottom: 0
  // }))

  return (
    <Box className="app-wrapper">
      <Drawer
        className="app-sidebar"
        anchor="left"
        open={true}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            pt: 2,
            justifyContent: 'space-between',
          },
        }}
      >
        <Box
          sx={{
            m: 2,
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <DrawerHeader className="sidebar-greeting">
            <Typography variant="h6" fontSize={18} component="p">
              Hello,
              <Typography variant="h4" fontSize={30} component="span">
                {' ' + user.data.name}
              </Typography>
            </Typography>
          </DrawerHeader>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              id="account-button"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <ExpandMoreIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              MenuListProps={{
                'aria-labelledby': 'account-button',
              }}
              onClose={handleClose}
              onClick={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  minWidth: 200,
                  maxWidth: 500,
                },
              }}
            >
              <MenuList>
                <ListItem>
                  <ActivationStatusAlert></ActivationStatusAlert>
                </ListItem>
                {/*<ListItem sx={{ display: 'flex' }}>*/}
                {/*  <Typography>{user.data.email}</Typography>*/}
                {/*</ListItem>*/}
                <ListItem>
                  <ListItemButton>Log Out</ListItemButton>
                </ListItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        <Divider variant="fullWidth" />

        <List
          sx={{
            flexGrow: 1,
          }}
        >
          {menuItems.map((menuItem, index) => (
            <Link to={menuItem.url} key={index}>
              <ListItem button>
                <ListItemIcon>{menuItem.iconElement}</ListItemIcon>
                <ListItemText
                  primary={menuItem.title}
                  primaryTypographyProps={{
                    color: '#000',
                  }}
                />
              </ListItem>
            </Link>
          ))}
        </List>

        {/*    <DrawerFooter>*/}
        {/*        <Typography variant='body2' textAlign='center' paddingBottom={2}>*/}
        {/*            ©MyNotes 2022*/}
        {/*        </Typography>*/}
        {/*    </DrawerFooter>*/}
      </Drawer>

      <Container>
        <Outlet />
      </Container>
    </Box>
  );
};

export default DashboardLayout;
