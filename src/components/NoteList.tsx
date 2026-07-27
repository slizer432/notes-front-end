import { formatDistanceToNow } from "date-fns";
import { FileText, Inbox } from "lucide-react";
import type { Note } from "../types/Note";

interface NoteListProps {
  notes: Note[];
  selectedNoteId?: string;
  onNoteSelect: (note: Note) => void;
  title?: string;
}

const NoteList = ({
  notes,
  selectedNoteId,
  onNoteSelect,
  title = "Notes",
}: NoteListProps) => {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "Recently";
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="bg-zinc-950 h-full w-full border-r border-zinc-800 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-zinc-800 flex items-center justify-between min-h-16">
        <h1 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <FileText className="size-4 text-indigo-400" />
          <span>{title}</span>
        </h1>
        <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md font-medium">
          {notes.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-zinc-500">
            <Inbox className="size-12 mb-3 stroke-[1.5] text-zinc-600" />
            <p className="text-sm font-medium text-zinc-400 mb-1">No notes found</p>
            <p className="text-xs text-zinc-500 max-w-[200px]">
              Try adjusting your search query or clear your filter options.
            </p>
          </div>
        ) : (
          notes.map((note) => {
            const isSelected = selectedNoteId === note.id;
            return (
              <div
                key={note.id}
                className={`p-5 border-b border-zinc-800/80 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-zinc-900 border-l-4 border-l-indigo-500 pl-4"
                    : "hover:bg-zinc-900/60 hover:border-l-4 hover:border-l-zinc-700 hover:pl-4"
                }`}
                onClick={() => onNoteSelect(note)}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h2
                    className={`text-sm font-semibold truncate ${
                      isSelected ? "text-indigo-200" : "text-zinc-200"
                    }`}
                  >
                    {note.title || "Untitled Note"}
                  </h2>
                  <span className="text-[11px] text-zinc-500 shrink-0">
                    {formatDate(note.updatedAt || note.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {note.content || "(No content)"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NoteList;

