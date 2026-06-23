import Note from "../components/NoteViewer";
import NoteList from "../components/NoteList";
import { useEffect, useState } from "react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState();

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
  }, []);

  return (
    <div className="flex w-full h-full">
      <NoteList notes={notes} onNoteSelect={setSelectedNote} />
      <Note note={selectedNote} />
    </div>
  );
};

export default Home;
