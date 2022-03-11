import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  createNote,
  NoteData,
  selectForeignNoteById,
  selectNoteById,
  selectPublicNoteById,
  updateNote,
} from '../../../../app/slices/notesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ILabel } from '../../../../models/ILabel';
import EditorForm from './NoteEditorForm';
import NoteEditorHeader from './NoteEditorHeader';
import NoteEditorUpdateDate from './NoteEditorUpdateDate';
import NoteEditorBody from './NoteEditorBody';
import NoteEditorFooter from './NoteEditorFooter';
import { INote } from '../../../../models/INote';
import notesType from '../../../../models/NotesType';

type Props = {
  notesType: notesType;
};

const NoteEditor: FC<Props> = ({ notesType }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const noteId = Number(useParams().noteId);
  let note: INote | undefined;
  if (notesType === 'personal') {
    note = useAppSelector((state) => selectNoteById(state, noteId));
  } else if (notesType === 'public') {
    note = useAppSelector((state) => selectPublicNoteById(state, noteId));
  } else if (notesType === 'foreign') {
    note = useAppSelector((state) => selectForeignNoteById(state, noteId));
  }

  if (noteId && !note) {
    navigate('/app');
  }

  const [isPrivate, setIsPrivate] = useState(note?.isPrivate);
  const [labels, setLabels] = useState<string[]>(
    note && note?.labels?.length > 0
      ? note?.labels.map((label: ILabel) => label.title)
      : []
  );

  const { handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    if (!note) {
      setIsPrivate(true);
      setLabels([]);
    }
  }, []);

  useEffect(() => {
    setIsPrivate(note?.isPrivate);
    if (note) {
      setLabels(note.labels.map((label: ILabel) => label.title));
      setValue('title', note.title);
      setValue('content', note.content);
    } else {
      setValue('title', '');
      setValue('content', '');
    }
  }, [note, noteId]);

  useEffect(() => {
    if (!note) {
      setIsPrivate(true);
    } else {
      setIsPrivate(note?.isPrivate);
    }
  }, [note?.isPrivate]);

  const onSubmit = (data: any) => {
    if (!note) {
      const noteData: NoteData = {
        title: data.title,
        content: data.content,
        isPrivate,
        labels,
      };
      dispatch(createNote(noteData));
    } else {
      const noteData: NoteData = {
        id: note.id,
        title: data.title,
        content: data.content,
        isPrivate,
        labels,
      };
      dispatch(updateNote(noteData));
    }
    navigate('/app');
    setValue('title', '');
    setValue('content', '');
    setLabels([]);
    setIsPrivate(true);
  };

  if (notesType === 'public') {
    return (
      <EditorForm>
        <NoteEditorHeader readonly titleValue={note?.title} />
        <NoteEditorUpdateDate updateDate={note?.updatedAt} />
        <NoteEditorBody readonly contentValue={note?.content} />
        <NoteEditorFooter readonly labels={labels} />
      </EditorForm>
    );
  } else if (notesType === 'personal') {
    return (
      <EditorForm onSubmit={handleSubmit(onSubmit)}>
        <NoteEditorHeader
          control={control}
          note={note}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
        />
        <NoteEditorUpdateDate updateDate={note?.updatedAt} />
        <NoteEditorBody control={control} setValue={setValue} />
        <NoteEditorFooter labels={labels} setLabels={setLabels} />
      </EditorForm>
    );
  } else {
    return (
      <EditorForm>
        <NoteEditorHeader readonly titleValue={note?.title} />
        <NoteEditorUpdateDate updateDate={note?.updatedAt} />
        <NoteEditorBody readonly contentValue={note?.content} />
        <NoteEditorFooter readonly labels={labels} />
      </EditorForm>
    );
  }
};
export default NoteEditor;
