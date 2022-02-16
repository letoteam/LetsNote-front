import React, {FC, useEffect, useState} from "react";
import {
    Autocomplete,
    Box, Button, Checkbox, Chip,
    Divider,
    IconButton,
    Input, TextField,
    Typography
} from "@mui/material";
import styled from "@emotion/styled";
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    deleteEditableNoteLabel,
    getLabels, IEditableNote, setEditableNote,
    setEditableNoteContent, setEditableNoteProp,
    setEditableNoteTitle,
    toggleEditableNotePrivacy
} from "../notesSlice";
import NoteOptionsButton from "./NoteOptionsButton";
import NotePrivacyButton from "./NotePrivacyButton";


const NoteEditor:FC = () => {
    const dispatch = useAppDispatch();

    const editableNote = useAppSelector(state => state.notes.editableNote);

    // const [title, setTitle] = useState(editableNote.title);

    const options = [
        {
            name: 'Save',
            iconElement: <SaveOutlinedIcon/>,
            cb: function(){
                console.log('asalalaa')
            }
        },
        {
            name: 'Remove',
            iconElement: <DeleteOutlineOutlinedIcon/>,
            cb: () => {}
        }
    ]

    let noteDate: string;
    if(editableNote.updatedAt) noteDate = editableNote.updatedAt.split('T')[0]
    else {
        let date = new Date();
        noteDate = `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}-${date.getDay() < 10 ? '0' : ''}${date.getDay()}`;
    }

    const EditorContainer = styled('form')(({ theme }) => ({
        marginLeft: '2rem',
        flexGrow: 1
    }));

    const EditorHeader = styled('div')
    (({theme}) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }))

    const UpdateDate = () => {
        return (
            <Divider variant={'fullWidth'} textAlign={"left"}>
                <Typography variant='caption' sx={{color: 'text.disabled', fontSize: '0.7rem', mr: '0.5rem', fontWeight: 'bold'}}>
                    {noteDate}
                </Typography>
            </Divider>
        )
    }

    return (
        <EditorContainer>
            <EditorHeader>
                <Input placeholder="Untitled"
                       fullWidth
                       multiline
                       // autoFocus
                       disableUnderline
                       defaultValue={editableNote.title}
                       sx={{
                           fontSize: '2rem',
                           p: 0,
                           borderBottom: 0,
                       }}
                       onChange={(e) => {
                           dispatch(setEditableNoteProp({prop: 'title', value: e.target.value}))
                           // dispatch(setEditableNoteTitle(e.target.value))
                       }}
                />
                <Box sx={{display: 'flex'}}>
                    <NotePrivacyButton size={"small"} isPrivate={editableNote.isPrivate} callback={() => {dispatch(toggleEditableNotePrivacy())}}/>
                    <NoteOptionsButton options={options} size={'medium'}/>
                </Box>
            </EditorHeader>

            <UpdateDate/>

            <Input placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
                   value={editableNote.content}
                   fullWidth
                   multiline
                   disableUnderline
                   sx={{
                       height: '300px',
                       alignItems: 'flex-start',
                       color: 'grey.700'
                   }}
                   onChange={(e) => {dispatch(setEditableNoteContent(e.target.value))}}
            />

            <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{
                    display:"flex",
                    alignItems: "center"
                }}>
                    {editableNote.labels.map(label =>
                        <Chip key={label.id} label={label.title} sx={{mr: 1}} onDelete={() => {dispatch(deleteEditableNoteLabel(label.id))}} />
                    )}
                    <Input placeholder="New Label" disableUnderline/>
                </Box>

                <Button variant="contained">Save</Button>
            </Box>

        </EditorContainer>
    )
}

export default NoteEditor;