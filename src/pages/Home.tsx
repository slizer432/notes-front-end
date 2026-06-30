import NoteViewer from "../components/NoteViewer";
import NoteList from "../components/NoteList";
import { useEffect, useState } from "react";
import NoteEditor from "../components/NoteEditor";
import type { Note } from "../types/Note";
import ConfirmModal from "../components/ConfirmModal";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:5164/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setNotes(data);
    };

    fetchNotes();
  }, [isEdit]);

  const handleUpdateNote = async () => {
    if (!selectedNote) return;

    const response = await fetch(
      `http://localhost:5164/notes/${selectedNote.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(selectedNote),
      },
    );
    if (response.ok) {
      setIsEdit(false);
      console.log("Note updated:");
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    const response = await fetch(
      `http://localhost:5164/notes/${selectedNote.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (response.ok) {
      setNotes(notes.filter((note) => note.id !== selectedNote.id));
      setSelectedNote(undefined);
      setDeleteModal(false);
    }
  };

  return (
    <div className="flex w-full h-full">
      <NoteList notes={notes} onNoteSelect={setSelectedNote} />
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
