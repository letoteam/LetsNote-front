import React, {FC, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser } from "../auth/authSlice";
import AuthService from "../../services/AuthService";

const DashboardLayout:FC = () => {
    const user = useAppSelector(selectUser);
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(test());
    // }, [dispatch]);
    return(
        <h1>Hello, {user.data.name}</h1>
    )
}

export default DashboardLayout;