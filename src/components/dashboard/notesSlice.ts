import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import NotesService from '../../services/NotesService';
import { INote } from '../../models/INote';
import { ILabel } from '../../models/ILabel';

export type IEditableNote = {
  id: number | 'new';
  title: string;
  isPrivate: boolean;
  content: string;
  labels: ILabel[];
  updatedAt: string | null;
};

type INotesState = {
  notes: INote[] | [];
  notesStatus: 'idle' | 'loading' | 'succeeded';
  labels: string[] | [];
  labelsStatus: 'idle' | 'loading' | 'succeeded';
  editableNote: IEditableNote;
  error?: string | null;
};

type SetNotePropAction = {
  noteId: number;
  prop: keyof INote;
  value: number | string;
};

const initialState: INotesState = {
  notes: [],
  notesStatus: 'idle',
  labels: [],
  labelsStatus: 'idle',
  editableNote: {
    id: 'new',
    title: '',
    isPrivate: true,
    content: '',
    labels: [],
    updatedAt: null,
  },
  error: null,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setEditableNote(state, action) {
      state.editableNote = {
        ...action.payload,
      };
    },
    setNewEditableNote(state) {
      state.editableNote = {
        id: 'new',
        title: '',
        isPrivate: true,
        content: '',
        labels: [],
        updatedAt: null,
      };
    },
    setEditableNoteProp(state, action) {
      state.editableNote = {
        ...state.editableNote,
        [action.payload.prop]: action.payload.value,
      };
    },
    setNoteProp(state, action: PayloadAction<SetNotePropAction>) {
      const noteIndex = state.notes.findIndex(
        (note) => note.id == action.payload.noteId
      );
      state.notes[noteIndex] = {
        ...state.notes[noteIndex],
        [action.payload.prop]: action.payload.value,
      };
    },
    toggleEditableNotePrivacy(state) {
      state.editableNote.isPrivate = !state.editableNote.isPrivate;
    },
    setEditableNoteTitle(state, action) {
      state.editableNote.title = action.payload;
    },
    setEditableNoteContent(state, action) {
      state.editableNote.content = action.payload;
    },
    setEditableNoteLabels(state, action) {
      state.editableNote.labels = [...action.payload];
    },
    deleteEditableNoteLabel(state, action) {
      const labelToDeleteIndex = state.editableNote.labels.findIndex(
        (label) => label.id === action.payload
      );
      state.editableNote.labels.splice(labelToDeleteIndex, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.notes = action.payload?.data;
        state.notesStatus = 'succeeded';
      } else state.notes = [];
    });
    builder.addCase(getNotes.pending, (state) => {
      state.notesStatus = 'loading';
    });

    builder.addCase(getLabels.pending, (state) => {
      state.labelsStatus = 'loading';
    });
    builder.addCase(getLabels.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.labels = action.payload.data;
        state.labelsStatus = 'succeeded';
      } else {
        state.labels = [];
      }
    });

    builder.addCase(toggleNotePrivacy.fulfilled, (state, action) => {
      if (action.payload?.data) {
        const updatedNote = action.payload?.data;
        const note = state.notes.find((note) => note.id === updatedNote?.id);
        if (note) note.isPrivate = updatedNote?.isPrivate;
      }
    });
  },
});

export const getNotes = createAsyncThunk('notes/getNotes', async () => {
  try {
    return await NotesService.getUserNotes();
  } catch (e) {
    console.log(e);
  }
});

export const getLabels = createAsyncThunk('notes/getLabels', async () => {
  try {
    return await NotesService.getUserLabels();
  } catch (e) {
    console.log(e);
  }
});

export const toggleNotePrivacy = createAsyncThunk(
  'notes/toggleNotePrivacy',
  async (noteId: number) => {
    try {
      console.log(noteId);
      return await NotesService.toggleNotePrivacy(noteId);
    } catch (e) {
      console.log(e);
    }
  }
);

export const {
  setEditableNote,
  toggleEditableNotePrivacy,
  setEditableNoteTitle,
  setEditableNoteContent,
  setEditableNoteLabels,
  deleteEditableNoteLabel,
  setEditableNoteProp,
  setNewEditableNote,
  setNoteProp,
} = notesSlice.actions;

export const selectAllNotes = (state: RootState) => state.notes;
export const selectNoteById = (state: RootState, noteId: number) =>
  state.notes.notes.find((note) => note.id === noteId);
export default notesSlice.reducer;
