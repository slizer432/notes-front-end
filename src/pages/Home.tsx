import NoteViewer from "../components/NoteViewer";
import NoteList from "../components/NoteList";
import { useEffect, useState } from "react";
import NoteEditor from "../components/NoteEditor";
import type { Note } from "../types/Note";
import ConfirmModal from "../components/ConfirmModal";
import { deleteNote, getNotes, updateNote } from "../helper/noteApi";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();

      setNotes(data);
    };

    fetchNotes();
  }, [isEdit]);

  const handleUpdateNote = async () => {
    if (!selectedNote) return;

    await updateNote(selectedNote);
    setIsEdit(false);
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    await deleteNote(selectedNote.id);
    setNotes(notes.filter((note) => note.id !== selectedNote.id));
    setSelectedNote(undefined);
    setDeleteModal(false);
  };

  return (
    <div className="flex w-full h-full">
      <div className="w-1/3 h-full">
        <NoteList notes={notes} onNoteSelect={setSelectedNote} />
      </div>
      {isEdit ? (
        <NoteEditor
          note={selectedNote}
          setNote={setSelectedNote}
          action={handleUpdateNote}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      ) : (
        <NoteViewer
          note={selectedNote}
          setIsEdit={setIsEdit}
          setDeleteModal={setDeleteModal}
        />
      )}
      {deleteModal && (
        <ConfirmModal
          message="Are you sure you want to delete this note?"
          onConfirm={() => {
            handleDeleteNote();
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
