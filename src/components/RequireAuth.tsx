import {useAppDispatch, useAppSelector} from "../app/hooks";
import {checkAuth, selectUser} from "./auth/authSlice";
import {FC} from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";

const useAuth = () => {
    const dispatch = useAppDispatch();
    dispatch(checkAuth);
    const user = useAppSelector(selectUser);
    return user.isAuth
}
const RequireAuth:FC = () => {
    let auth = useAuth();
    let location = useLocation();

    if(!auth){
        return <Navigate to="/login" state={{from: location}} />
    }

    return <Outlet/>
}

export default RequireAuth;




