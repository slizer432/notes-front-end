import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

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
    <div className="bg-black h-full w-[60vh] border-l border-b border-zinc-700 flex flex-col border-r">
      <div className="p-6 border-b border-zinc-700 min-h-20">
        <h1 className="text-lg font-bold uppercase text-zinc-400">Notes</h1>
      </div>
      {notes.map((note: any) => (
        <div
          key={note.id}
          className="p-7 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-300">{note.title}</h2>
            <p className="text-zinc-500">
              {formatDistance(new Date(note.updatedAt), new Date())} ago
            </p>
          </div>
          <p className="text-zinc-500">{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
