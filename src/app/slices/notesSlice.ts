import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import NotesService from '../../http/services/NotesService';
import { INote } from '../../models/INote';
import { ILabel } from '../../models/ILabel';
import { Notes } from '@mui/icons-material';
import UserService from '../../http/services/UserService';
import NotesType from '../../models/NotesType';

type Maybe<T> = T | undefined;

export type Editor = {
  noteId: number | 'new';
  status: 'idle' | 'pending';
  hasChanges: boolean;
};
export type Reader = {
  noteId: number | null;
  status: 'idle' | 'reading';
};

type SetNotePropAction = {
  noteId: number;
  prop: keyof INote;
  value: number | string;
};

type SearchProps = {
  value: string;
  notesType: NotesType;
};

export type NoteData = {
  id?: number;
  title: string;
  content: string;
  isPrivate: Maybe<boolean>;
  labels: string[];
};

type INotesState = {
  notes: INote[];
  publicNotes: INote[];
  userNotes: INote[];
  notesStatus: 'idle' | 'loading' | 'succeeded';
  filteredNotes: INote[] | null;
  labels: string[];
  labelsStatus: 'idle' | 'loading' | 'succeeded';
  editor: Editor;
  reader: Reader;
  error?: string | null;
};

const initialState: INotesState = {
  notes: [],
  publicNotes: [],
  userNotes: [],
  notesStatus: 'idle',
  filteredNotes: null,
  labels: [],
  labelsStatus: 'idle',
  editor: {
    noteId: 'new',
    status: 'idle',
    hasChanges: false,
  },
  reader: {
    noteId: null,
    status: 'idle',
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
    setFilteredNotesBySearch(state, action: PayloadAction<SearchProps>) {
      let filteredNotes: INote[];
      if (action.payload.notesType === 'personal') {
        filteredNotes = state.notes.filter((note) => {
          if (
            note.title.includes(action.payload.value) ||
            note.content.includes(action.payload.value)
          ) {
            return true;
          }
        });
      } else if (action.payload.notesType === 'public') {
        filteredNotes = state.publicNotes.filter((note) => {
          if (
            note.title.includes(action.payload.value) ||
            note.content.includes(action.payload.value)
          ) {
            return true;
          }
        });
      } else {
        filteredNotes = state.userNotes.filter((note) => {
          if (
            note.title.includes(action.payload.value) ||
            note.content.includes(action.payload.value)
          ) {
            return true;
          }
        });
      }
      state.filteredNotes = filteredNotes;
    },
    setFilteredNotesByLabel(state, action: PayloadAction<string>) {
      const label = action.payload;
      const filteredNotes = state.notes.filter((note) => {
        for (let i = 0; i < note.labels.length; i++) {
          if (note.labels[i].title === label) {
            return true;
          }
        }
      });

      state.filteredNotes = filteredNotes;
    },
    setNullableFilteredNotes(state) {
      state.filteredNotes = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getNotes.pending, (state) => {
      state.notesStatus = 'loading';
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.notes = action.payload?.data;
        state.notesStatus = 'succeeded';
      } else {
        state.notes = [];
      }
    });

    builder.addCase(getPublicNotes.pending, (state) => {
      state.notesStatus = 'loading';
    });
    builder.addCase(getPublicNotes.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.publicNotes = action.payload?.data;
        state.notesStatus = 'succeeded';
      } else {
        state.publicNotes = [];
      }
    });

    builder.addCase(getUserNotes.pending, (state) => {
      state.notesStatus = 'loading';
    });
    builder.addCase(getUserNotes.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.userNotes = action.payload?.data;
        state.notesStatus = 'succeeded';
      } else {
        state.userNotes = [];
      }
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
      const data = action.payload?.data;
      const noteIndex = state.notes.findIndex((note) => note.id === data?.id);
      const note = state.notes[noteIndex];
      if (note && data) {
        note.title = data.title;
        note.isPrivate = data.isPrivate;
        note.content = data.content;
        note.updatedAt = data.updatedAt;
        note.labels = data.labels;
      }
    });

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      if (action.payload?.data) {
        const noteId = action.payload?.data.noteId;
        const noteIndex = state.notes.findIndex((note) => note.id === noteId);
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
    return await NotesService.getMyNotes();
  } catch (e) {
    console.log(e);
  }
});

export const getPublicNotes = createAsyncThunk(
  'notes/getPublicNotes',
  async () => {
    try {
      return await NotesService.getPublicNotes();
    } catch (e) {
      console.log(e);
    }
  }
);

export const getUserNotes = createAsyncThunk(
  'notes/getUserNotes',
  async (userId: number) => {
    try {
      return await UserService.getUserNotes(userId);
    } catch (e) {
      console.log(e);
    }
  }
);

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
  async (data: NoteData) => {
    try {
      // const labels = data.labels.map((label) => label.title);
      let isPrivate;
      data.isPrivate === undefined
        ? (isPrivate = true)
        : (isPrivate = data.isPrivate);
      if (data.id) {
        return await NotesService.updateNote(
          data.id,
          data.title,
          data.content,
          isPrivate,
          data.labels
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const createNote = createAsyncThunk(
  'notes/createNote',
  async (data: NoteData) => {
    try {
      let isPrivate;
      data.isPrivate === undefined
        ? (isPrivate = true)
        : (isPrivate = data.isPrivate);
      return await NotesService.createNote(
        data.title,
        data.content,
        isPrivate,
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

export const {
  setFilteredNotesBySearch,
  setFilteredNotesByLabel,
  setNullableFilteredNotes,
} = notesSlice.actions;

export const selectAllNotes = (state: RootState) => state.notes;
export const selectNoteById = (state: RootState, noteId: number) =>
  state.notes.notes.find((note) => note.id === noteId);
export const selectPublicNoteById = (state: RootState, noteId: number) =>
  state.notes.publicNotes.find((note) => note.id === noteId);
export const selectForeignNoteById = (state: RootState, noteId: number) =>
  state.notes.publicNotes.find((note) => note.id === noteId);
export default notesSlice.reducer;
