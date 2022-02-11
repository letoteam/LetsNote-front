import React, {FC, useEffect} from "react";
import {Box, Button, Divider, InputAdornment, TextField, Typography} from "@mui/material";
import AppHeader from "../AppHeader";
import NotesFeed from "./NotesFeed";
import NoteEditor from "./NoteEditor";
import EditIcon from '@mui/icons-material/Edit';
import {useParams} from "react-router-dom";

const Dashboard:FC = () => {
    const noteId = useParams().noteId;
    console.log(noteId);
    const HeaderComponent = <Button variant="contained" size={'large'} endIcon={<EditIcon />} sx={{fontWeight: '700'}}>New Note</Button>

    return(
        <Box>
            <AppHeader title="My Notes" headerComponent={HeaderComponent}/>

            <Box
                sx={{
                    display: 'flex'
                }}>
                <NotesFeed/>
                <Divider orientation="vertical" variant="fullWidth" flexItem />
                <NoteEditor/>
            </Box>
        </Box>
    )
}

export default Dashboard;