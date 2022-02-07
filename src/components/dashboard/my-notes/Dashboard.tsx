import React, {FC, useEffect} from "react";
import {Box, InputAdornment, TextField, Typography} from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AppHeader from "../AppHeader";
import NotesFeed from "./NotesFeed";

const Dashboard:FC = () => {
    const HeaderComponent =
        <TextField
            id="search-note-input"
            label="Search Note"
            size='small'
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchRoundedIcon />
                    </InputAdornment>
                ),
            }}
        />

    return(
        <Box>
            <AppHeader title="My Notes" headerComponent={HeaderComponent}/>

            <Box
                sx={{
                    display: 'flex'
                }}>
                <NotesFeed/>
            </Box>
        </Box>
    )
}

export default Dashboard;