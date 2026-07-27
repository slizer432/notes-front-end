import { useState } from "react";
import NoteEditor from "../components/NoteEditor";
import { createNote } from "../helper/noteApi";
import { getErrorMessage } from "../helper/errorUtils";
import { AlertCircle } from "lucide-react";

const CreateNote = () => {
  const [note, setNote] = useState();
  const [error, setError] = useState<string | null>(null);

  const handleCreateNote = async () => {
    setError(null);
    try {
      await createNote(note ?? {});
      window.location.href = "/home";
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {error && (
        <div className="p-4 bg-red-950/60 border-b border-red-800/80 flex items-center gap-2.5 text-xs text-red-200">
          <AlertCircle className="size-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <div className="flex-1">
        <NoteEditor action={handleCreateNote} note={note} setNote={setNote} />
      </div>
    </div>
  );
};

export default CreateNote;

