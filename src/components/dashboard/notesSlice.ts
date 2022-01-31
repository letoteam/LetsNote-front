import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import NotesService from "../../services/NotesService";

const initialState = {
    data: {}
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.data = action.payload?.data;
        })
    }
})

export const getNotes = createAsyncThunk(
    'notes/getNotes',
    async () => {
        try {
            const response = await NotesService.getUserNotes();
            console.log(response)
            return response;
        }catch (e) {

            console.log(e);
        }
    }
)

export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;