import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import NotesService from "../../services/NotesService";
import {INote} from "../../models/INote";

type INotesState = {
    notes: INote[] | [];
    status: 'idle' | 'loading' | 'succeeded',
    error?: string | null
}

const initialState:INotesState = {
    notes: [],
    status: "idle",
    error: null
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(getNotes.fulfilled, (state, action) => {
            console.log(action.payload);
            if(action.payload?.data){
                state.notes = action.payload?.data;
                state.status = 'succeeded'
            }
            else state.notes = []
        });
        builder.addCase(getNotes.pending, (state, action) => {
            state.status = 'loading'
        });
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

export const selectAllNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;