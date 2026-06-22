import { History } from "lucide-react";

const Note = () => {
  return (
    <div className="bg-neutral-900 w-full h-full">
      <div className="border-b border-zinc-700 w-full p-6 text-zinc-400 flex min-h-20 gap-2 items-center">
        <div className="flex items-center gap-5 relative">
          <History />
          <div className="border-r border border-zinc-700 self-stretch" />
          <p className="text-sm font-medium">Last Edited</p>
        </div>
      </div>
    </div>
  );
};

export default Note;
