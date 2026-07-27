import { useState } from "react";
import NoteEditor from "../components/NoteEditor";
import { createNote } from "../helper/noteApi";

const CreateNote = () => {
  const [note, setNote] = useState();

  const handleCreateNote = async () => {
    await createNote(note ?? {});
    window.location.href = "/home";
  };

  return (
    <div className="w-full h-full">
      <NoteEditor action={handleCreateNote} note={note} setNote={setNote} />
    </div>
  );
};

export default CreateNote;
