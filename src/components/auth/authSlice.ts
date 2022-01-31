import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
import AuthService from "../../services/AuthService";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import {API_URL} from "../../http/HttpBase/ApiBase";

type IUserState = {
    data: IUserData
    isAuth: boolean
    error?: string
}
type ILoginData = {
    email: string,
    password: string
}
type ISignupData = ILoginData & {
    name: string
}
type IUserData = {
    id: number,
    name: string,
    email: string,
    isActivated: boolean
}
type IResetData = {
    resetToken: string,
    newPassword: string
}

const initialState: IUserState = {
    data: {
        id: 0,
        name: '',
        email: '',
        isActivated: false
    },
    isAuth: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError(state, action){
            state.error = action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(login.fulfilled, (state, action) => {
            if(action.payload.status !== 200) state.error = action.payload.data.message;
            else{
                localStorage.setItem('token', action.payload.data.accessToken);
                state.data = {
                    ...action.payload?.data?.user
                }
                state.isAuth = true;
            }
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            if(action.payload.status !== 200) state.error = action.payload.data.message;
            else{
                localStorage.setItem('token', action.payload.data.accessToken);
                state.data = {
                    ...action.payload?.data?.user
                }
                state.isAuth = true;
            }
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            if(action.payload.status !== 200) state.error = action.payload.data.message;
            else{
                localStorage.removeItem('token');
                state.isAuth = false;
            }
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            if(action?.payload?.status !== 200) state.error = action?.payload?.data.message;
            else{
                console.log(action.payload.data);
                localStorage.setItem('token', action?.payload?.data.accessToken);
                state.data = {
                    ...action.payload?.data?.user
                }
                state.isAuth = true;
            }
        })

    }
})

export const login = createAsyncThunk(
    'user/login',
    async (data:ILoginData) => {
        try {
            const response: AxiosResponse = await AuthService.logIn(data.email, data.password)
            return response;
        }catch (e: any){
            return e.response;
        }
    }
)

export const signup = createAsyncThunk(
    'user/signup',
    async (data:ISignupData) => {
        try {
            const response: AxiosResponse = await AuthService.signUp(data.name, data.email, data.password);
            return response;
        }catch (e:any){
            return e.response;
        }
    }
)

export const sendResetLink = createAsyncThunk(
    'user/recover',
    async (data:{email: string}) => {
        try {
            const response: AxiosResponse = await AuthService.sendResetLink(data.email);
            return response;
        }catch (e:any){
            return e.response;
        }
    }
)

export const resetPassword = createAsyncThunk(
    'user/reset',
    async (data:IResetData) => {
        try {
            const response: AxiosResponse = await AuthService.resetPassword(data.resetToken, data.newPassword);
            return response;
        }catch (e:any){
            return e.response;
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            const response = await AuthService.logOut();
            return response;
        }catch (e:any){
            console.log(e.response?.data?.message);
            return e.response;
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/refresh',
    async () => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            return response;
        }catch (e:any){
            console.log(e.response?.data?.message);
        }
    }
)

// export const { setUser } = userSlice.actions
export const { setError }  = userSlice.actions
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer