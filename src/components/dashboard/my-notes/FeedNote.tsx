import React, {FC} from "react";
import {INote} from '../../../models/INote'
import {Card, CardContent, ListItem, Typography} from "@mui/material";

type props = {
    note: INote
}

const FeedNote = ({note}: props) => {
    const updateDate = note.updatedAt.split('T')[0];

    return(
        <ListItem>
            <CardContent>
                <Typography variant='h5' component='div'>
                    {note.title}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {updateDate}
                </Typography>
            </CardContent>
        </ListItem>
    )
}

export default FeedNote;