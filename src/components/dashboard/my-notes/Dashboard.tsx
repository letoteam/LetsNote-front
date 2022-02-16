import React, {FC, useEffect} from "react";
import {Box, Button, Divider, InputAdornment, TextField, Typography} from "@mui/material";
import AppHeader from "../AppHeader";
import NotesFeed from "./NotesFeed";
import NoteEditor from "./NoteEditor";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectNoteById, setEditableNote} from "../notesSlice";
import {INote} from "../../../models/INote";


const Dashboard:FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const noteId = Number(useParams().noteId);
    const note = useAppSelector((state) => selectNoteById(state, noteId));
    if(note) dispatch(setEditableNote(note))
    
    const HeaderComponent = <Button variant="contained" size={'large'} endIcon={<EditIcon />} sx={{fontWeight: '700'}} onClick={() => {navigate('/app')}}>New Note</Button>

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