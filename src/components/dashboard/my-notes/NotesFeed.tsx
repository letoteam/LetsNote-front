import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getNotes, selectAllNotes} from "../notesSlice";
import Spinner from "../../Spinner";
import FeedNote from "./FeedNote";
import {List} from "@mui/material";

const NotesFeed:FC = () => {
    const dispatch = useAppDispatch();
    const notes = useAppSelector(selectAllNotes);

    useEffect(() => {
        if(notes.status === 'idle') {
            dispatch(getNotes());
        }
    }, []);

    let content;

    if(notes.status === "loading"){
        content = <Spinner/>
    }else if(notes.status === 'succeeded'){
        content =
            <List>
                {notes.notes.map(note => {
                    <FeedNote note={note}/>
                })}
            </List>
    }

    return(
        <h2>{content}</h2>
    )
}

export default NotesFeed;