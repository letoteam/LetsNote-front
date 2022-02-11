import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import NotesService from "../../services/NotesService";
import {INote} from "../../models/INote";
import {ILabel} from "../../models/ILabel";

type IEditableNote = {
    id: number | "new",
    title: string,
    isPrivate: boolean,
    content: string,
    labels: ILabel[],
    updatedAt: string | null
}

type INotesState = {
    notes: INote[] | [];
    notesStatus: 'idle' | 'loading' | 'succeeded';
    labels: string[] | [];
    labelsStatus: 'idle' | 'loading' | 'succeeded';
    editableNote: IEditableNote,
    error?: string | null;
}

const initialState:INotesState = {
    notes: [],
    notesStatus: "idle",
    labels: [],
    labelsStatus: "idle",
    editableNote: {
        id: 'new',
        title: '',
        isPrivate: true,
        content: '',
        labels: [],
        updatedAt: null
    },
    error: null
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setEditableNote(state, action){
            console.log(action.payload)
            state.editableNote = {
                ...action.payload
            }
            // state.editableNote.id = action.payload.id;
        },
        toggleEditableNotePrivacy(state){
            state.editableNote.isPrivate = !state.editableNote.isPrivate;
        },
        setEditableNoteTitle(state, action){
            state.editableNote.title = action.payload;
        },
        setEditableNoteContent(state, action){
            state.editableNote.content = action.payload;
        },
        setEditableNoteLabels(state, action){
            state.editableNote.labels = [...action.payload];
        },
        deleteEditableNoteLabel(state, action){
            let labelToDeleteIndex = state.editableNote.labels.findIndex((label) => label.id === action.payload);
            state.editableNote.labels.splice(labelToDeleteIndex, 1);
        }
    },
    extraReducers(builder){
        builder.addCase(getNotes.fulfilled, (state, action) => {
            if(action.payload?.data){
                state.notes = action.payload?.data
                state.notesStatus = 'succeeded';
            }
            else state.notes = []
        });
        builder.addCase(getNotes.pending, (state, action) => {
            state.notesStatus = 'loading';
        });

        builder.addCase(getLabels.pending, (state, action) => {
            state.labelsStatus = 'loading';
        })
        builder.addCase(getLabels.fulfilled, (state, action) => {
            if(action.payload?.data){
                state.labels = action.payload.data;
                state.labelsStatus = 'succeeded';
            }else{
                state.labels = [];
            }
        });

        builder.addCase(toggleNotePrivacy.fulfilled, (state, action) => {
            if(action.payload?.data){
                let updatedNote = action.payload?.data;
                let note = state.notes.find(note => note.id === updatedNote?.id);
                if(note) note.isPrivate = updatedNote?.isPrivate;
            }
        });
    }
})

export const getNotes = createAsyncThunk(
    'notes/getNotes',
    async () => {
        try {
            const response = await NotesService.getUserNotes();
            return response;
        }catch (e) {
            console.log(e);
        }
    }
)

export const getLabels = createAsyncThunk(
    'notes/getLabels',
    async () => {
        try {
            const response = await NotesService.getUserLabels();
            return response;
        }catch (e){
            console.log(e);
        }
    }
)

export const toggleNotePrivacy = createAsyncThunk(
    'notes/toggleNotePrivacy',
    async (noteId: number) => {
        try {
            console.log(noteId)
            const response = await NotesService.toggleNotePrivacy(noteId);
            return response;
        }catch(e){
            console.log(e);
        }
    }
)

export const { setEditableNote, toggleEditableNotePrivacy, setEditableNoteTitle, setEditableNoteContent, setEditableNoteLabels, deleteEditableNoteLabel } = notesSlice.actions;

export const selectAllNotes = (state: RootState) => state.notes;
export const selectAllLabels = (state: RootState) => state.notes.labels;
export const selectLabelsStatus = (state: RootState) => state.notes.labelsStatus;
export const selectNoteById = (state: RootState, noteId: number) =>
    state.notes.notes.find(note => note.id === noteId)
export default notesSlice.reducer;