import React, {FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser, logout } from "../auth/authSlice";
import {useNavigate} from "react-router-dom";
import {getNotes, selectNotes} from "./notesSlice";

const DashboardLayout:FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const notes = useAppSelector(selectNotes);
    const navigate = useNavigate();
    console.log(notes);
    return(
        <>
            <h1>Hello, {user.data.name}</h1>
            <button onClick={() => {
                dispatch(getNotes())
            }}>Get Notes</button>
            <button onClick={() => {
                dispatch(logout())
            }}>Logout</button>
        </>
    )
}

export default DashboardLayout;