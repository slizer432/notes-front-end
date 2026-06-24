import { ArrowDownToLine } from "lucide-react";

const NoteEditor = ({
  action,
  title,
  setTitle,
  content,
  setContent,
}: {
  action: () => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
}) => {
  return (
    <div className="bg-black w-full h-full">
      <div className="border-b border-zinc-700 w-full py-6 px-10 text-zinc-300 flex min-h-20 gap-2 items-center justify-between">
        <p className="text-2xl font-bold">Create New Note</p>
        <button
          className="bg-violet-300 text-violet-900 font-bold py-2 px-4 rounded flex items-center gap-2 text-xl cursor-pointer hover:bg-violet-400 transition-colors"
          onClick={action}
        >
          <ArrowDownToLine className="size-6" />
          Save
        </button>
      </div>
      <div className="px-10">
        <form className="px-4 pt-10 pb-20 flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <input
              className="text-zinc-300 outline-none text-3xl font-bold"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <hr className="border-zinc-600" />
          </div>
          <input
            className="text-zinc-300 outline-none"
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
