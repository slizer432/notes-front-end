import { formatDistance } from "date-fns";

const NoteList = ({
  notes,
  onNoteSelect,
}: {
  notes: any[];
  onNoteSelect: (note: any) => void;
}) => {
  return (
    <div className="bg-black h-full w-[60vh] border-l border-b border-zinc-700 flex flex-col border-r">
      <div className="p-6 border-b border-zinc-700 min-h-20">
        <h1 className="text-lg font-bold uppercase text-zinc-400">Notes</h1>
      </div>
      {notes.map((note: any) => (
        <div
          key={note.id}
          className="p-7 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer"
          onClick={() => onNoteSelect(note)}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-300 truncate max-w-[25vh]">
              {note.title}
            </h2>
            <p className="text-zinc-500 truncate max-w-[25vh]">
              {formatDistance(new Date(note.updatedAt), new Date())} ago
            </p>
          </div>
          <p className="text-zinc-500 truncate max-w-[25vh]">{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
