import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import NotesService from '../../services/NotesService';
import { INote } from '../../models/INote';
import { ILabel } from '../../models/ILabel';
import { Notes } from '@mui/icons-material';

export type Editor = {
  noteId: number | 'new';
  status: 'idle' | 'pending';
  hasChanges: boolean;
};

type INotesState = {
  notes: INote[];
  notesStatus: 'idle' | 'loading' | 'succeeded';
  labels: string[];
  labelsStatus: 'idle' | 'loading' | 'succeeded';
  editor: Editor;
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
  editor: {
    noteId: 'new',
    status: 'idle',
    hasChanges: false,
  },
  error: null,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNoteProp(state, action: PayloadAction<SetNotePropAction>) {
      const noteIndex = state.notes.findIndex(
        (note) => note.id == action.payload.noteId
      );
      state.notes[noteIndex] = {
        ...state.notes[noteIndex],
        [action.payload.prop]: action.payload.value,
      };
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

    builder.addCase(createNote.pending, (state) => {
      state.editor.status = 'pending';
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.editor.status = 'idle';
      // state.editor.noteId = 'new';
      state.editor.hasChanges = false;
      if (action.payload?.data) {
        state.notes.push({ ...action.payload.data });
      }
    });

    builder.addCase(updateNote.pending, (state) => {
      state.editor.status = 'pending';
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.editor.status = 'idle';
      state.editor.hasChanges = false;
      const noteIndex = state.notes.findIndex(
        (note) => note.id === action.payload?.data.id
      );
      let note = state.notes[noteIndex];
      if (note && action.payload?.data) {
        note = { ...action.payload.data };
      }
    });

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      if (action.payload?.data) {
        const noteId = action.payload?.data;
        const noteIndex = state.notes.findIndex(
          (note) => note.id === noteIndex
        );
        state.notes.splice(noteIndex, 1);
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
      return await NotesService.toggleNotePrivacy(noteId);
    } catch (e) {
      console.log(e);
    }
  }
);
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (data: INote) => {
    try {
      const labels = data.labels.map((label) => label.title);
      return await NotesService.updateNote(
        data.id,
        data.title,
        data.content,
        data.isPrivate,
        labels
      );
    } catch (e) {
      console.log(e);
    }
  }
);
export const createNote = createAsyncThunk(
  'notes/createNote',
  async (data: {
    title: string;
    content: string;
    isPrivate: boolean;
    labels: string[];
  }) => {
    try {
      return await NotesService.createNote(
        data.title,
        data.content,
        data.isPrivate,
        data.labels
      );
    } catch (e) {
      console.log(e);
    }
  }
);
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (noteId: number) => {
    try {
      return await NotesService.deleteNote(noteId);
    } catch (e) {
      console.log(e);
    }
  }
);

export const { setNoteProp } = notesSlice.actions;

export const selectAllNotes = (state: RootState) => state.notes;
export const selectNoteById = (state: RootState, noteId: number) =>
  state.notes.notes.find((note) => note.id === noteId);
export default notesSlice.reducer;
