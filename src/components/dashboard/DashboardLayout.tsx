import React, {FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser, logout } from "../auth/authSlice";
import {Link, useNavigate} from "react-router-dom";
import {getNotes, selectNotes} from "./notesSlice";
import Spinner from "../Spinner";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {Box, Container, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";

import {Outlet, SvgIconComponent} from '@mui/icons-material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

type IMenuItem = {
    title: string,
    iconElement: any,
    url: string
}

const menuItems: IMenuItem[] = [
    {
        title: 'My Notes',
        iconElement: <HomeRoundedIcon/>,
        url: '/app'
    },
    {
        title: 'Profile',
        iconElement: <PersonRoundedIcon/>,
        url: 'profile'
    },
    {
        title: 'Public Notes',
        iconElement: <StickyNote2RoundedIcon/>,
        url: 'public-notes'
    },
    {
        title: 'Users',
        iconElement: <GroupRoundedIcon/>,
        url: 'users'
    }
]

const drawerWidth = 250;

const DashboardLayout:FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const notes = useAppSelector(selectNotes);
    const navigate = useNavigate();

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'baseline'
    }))

    return(
        <Box className="app-wrapper">
            <Drawer className="app-sidebar"
                    anchor="left"
                    open={true}
                    variant='permanent'
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            mt: 2
                        },
                    }}
            >
                <DrawerHeader className="sidebar-greeting"
                              sx={{
                                  m: 2,
                                  mt: 3
                              }}
                >
                    <Typography variant='h6'
                                fontSize={18}
                                component="p"
                    >
                        Hello,
                        <Typography variant='h4'
                                    fontSize={30}
                                    component="span"
                        >
                            {" " + user.data.name}
                        </Typography>
                    </Typography>
                </DrawerHeader>

                <List>
                    {menuItems.map((menuItem,index) => (
                        <Link to={menuItem.url}>
                            <ListItem button key={menuItem.title}>
                                <ListItemIcon>
                                    {menuItem.iconElement}
                                </ListItemIcon>
                                <ListItemText primary={menuItem.title}
                                              primaryTypographyProps={{
                                                  color: "#000",
                                              }}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>

            <Container>
                <Outlet/>
            </Container>
        </Box>
        // <>
        //     <h1>Hello, {user.data.name}</h1>
        //     <button onClick={() => {
        //         dispatch(getNotes())
        //     }}>Get Notes</button>
        //     <button onClick={() => {
        //         dispatch(logout())
        //     }}>Logout</button>
        // </>
    )
}

export default DashboardLayout;