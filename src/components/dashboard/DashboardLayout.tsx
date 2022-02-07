import React, {FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser, logout } from "../auth/authSlice";
import {Link, useNavigate, Outlet} from "react-router-dom";
import Spinner from "../Spinner";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {Box, Container, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
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
        title: 'Profile',
        iconElement: <PersonRoundedIcon/>,
        url: 'profile'
    },
    {
        title: 'My Notes',
        iconElement: <HomeRoundedIcon/>,
        url: '/app'
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
    const user = useAppSelector(selectUser);

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'baseline'
    }))

    // const DrawerFooter = styled('footer')(({ theme }) => ({
    //     position: 'relative',
    //     bottom: 0
    // }))

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
                            pt: 2,
                            justifyContent: 'space-between'
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

                <List
                    sx={{
                        flexGrow: 1
                    }}
                >
                    {menuItems.map((menuItem,index) => (
                        <Link to={menuItem.url}>
                            <ListItem button key={index}>
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

            {/*    <DrawerFooter>*/}
            {/*        <Typography variant='body2' textAlign='center' paddingBottom={2}>*/}
            {/*            ©MyNotes 2022*/}
            {/*        </Typography>*/}
            {/*    </DrawerFooter>*/}
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