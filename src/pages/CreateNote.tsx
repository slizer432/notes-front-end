import { useState } from "react";
import NoteEditor from "../components/NoteEditor";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = async () => {
    const response = await fetch("http://localhost:5164/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Note created:", data);
      window.location.href = "/home";
    }
  };

  return (
    <div className="w-full h-full">
      <NoteEditor
        action={handleCreateNote}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />
    </div>
  );
};

export default CreateNote;
