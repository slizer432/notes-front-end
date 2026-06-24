import { formatDistance } from "date-fns";
import { CirclePlus } from "lucide-react";

const Note = ({ note }: { note: any }) => {
  return (
    <div className="bg-neutral-900 w-full h-full">
      {note ? (
        <>
          <div className="border-b border-zinc-700 w-full p-6 text-zinc-400 flex min-h-20 gap-2 items-center">
            <div className="flex items-center gap-5 relative">
              {/* <div className="border-r border border-zinc-700 self-stretch" /> */}
              <p className="text-sm font-medium">
                Last edited{" "}
                {formatDistance(new Date(note.updatedAt), new Date()) + " ago"}
              </p>
            </div>
          </div>
          <div className="px-10">
            <article className="px-4 pt-10 pb-20 flex flex-col gap-7">
              <div className="flex flex-col gap-5">
                <h1 className="text-zinc-300 text-3xl font-bold">
                  {note.title}
                </h1>
                <hr className="border-zinc-600" />
              </div>
              <p className="text-zinc-300">{note.content}</p>
            </article>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center h-full gap-5">
            <img
              src="public/no-note.png"
              alt=""
              className="rounded-2xl border-zinc-700 border"
            />
            <p className="text-stone-200 text-2xl font-medium">
              No note selected
            </p>
            <p className="text-stone-400 text-sm font-normal">
              Select a note from the list or create a new one to get started.
            </p>
            <button
              className="bg-violet-300 text-violet-900 font-bold py-4 px-6 rounded flex items-center gap-2 cursor-pointer hover:bg-violet-400 transition-colors"
              onClick={() => (window.location.href = "/create-note")}
            >
              <CirclePlus /> Create New Note
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
