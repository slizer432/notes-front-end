import { useState } from "react";
import NoteEditor from "../components/NoteEditor";

const CreateNote = () => {
  const [note, setNote] = useState();

  const handleCreateNote = async () => {
    const response = await fetch("http://localhost:5164/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(note),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Note created:", data);
      window.location.href = "/home";
    }
  };

  return (
    <div className="w-full h-full">
      <NoteEditor action={handleCreateNote} note={note} setNote={setNote} />
    </div>
  );
};

export default CreateNote;
