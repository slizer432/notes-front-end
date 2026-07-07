import { ArrowDownToLine, X } from "lucide-react";

const NoteEditor = ({
  action,
  note,
  setNote,
  isEdit,
  setIsEdit,
}: {
  action: () => void;
  note: any;
  setNote: (note: any) => void;
  isEdit?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
}) => {
  return (
    <div className="bg-black w-full h-full">
      <div className="border-b border-zinc-700 w-full px-6 text-zinc-300 flex min-h-20 gap-2 items-center justify-between">
        <p className="text-2xl font-bold">
          {isEdit ? "Edit Note" : "Create New Note"}
        </p>
        <div className="flex gap-4">
          {isEdit ? (
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer hover:bg-red-600 transition-colors"
              onClick={() => setIsEdit && setIsEdit(false)}
            >
              <X />
              cancel
            </button>
          ) : null}
          <button
            className="bg-violet-300 text-violet-900 font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer hover:bg-violet-400 transition-colors"
            onClick={action}
          >
            <ArrowDownToLine className="size-6" />
            Save
          </button>
        </div>
      </div>
      <div className="px-10">
        <form className="px-4 pt-10 pb-20 flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <input
              className="text-zinc-300 outline-none text-3xl font-bold"
              placeholder="Note Title"
              minLength={3}
              value={note ? note.title : ""}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            ></input>
            <hr className="border-zinc-600" />
          </div>
          <input
            className="text-zinc-300 outline-none"
            placeholder="Note content"
            minLength={5}
            value={note ? note.content : ""}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
