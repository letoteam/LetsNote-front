import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
import AuthService from "../../services/AuthService";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";

interface IUserState {
    data: IUserData
    error?: string
}
type ILoginData = {
    email: string,
    password: string
}
type IUserData = {
    id: number,
    name: string,
    email: string,
    isActivated: boolean
}

const initialState: IUserState = {
    data: {
        id: 0,
        name: '',
        email: '',
        isActivated: false
    },
    error: ''
}
// записать пользователя [done]
// сохранить токен
// перенаправить на /app

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.data.accessToken);
            console.log(action.payload);
            if(action.payload.status !== 200) state.error = action.payload.data.message;
            else{
                state.data = {
                    ...action.payload?.data?.user
                }
            }
        });
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

// export const { setUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer