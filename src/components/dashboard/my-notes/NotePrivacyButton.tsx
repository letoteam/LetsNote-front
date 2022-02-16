import React, {useEffect} from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import {IconButton} from "@mui/material";

type props = {
    isPrivate: boolean,
    size: 'small' | 'medium' | 'large',
    callback: Function
}



export default (props:props) => {
    let privateIcon = <LockRoundedIcon fontSize={props.size} />

    if(!props.isPrivate){
        privateIcon =  <LockOpenRoundedIcon fontSize={props.size} />
    }

    return (
        <IconButton size={props.size} onClick={(e) => props.callback(e)}>
            {privateIcon}
        </IconButton>
    )
}