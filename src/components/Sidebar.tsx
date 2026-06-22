import { FileText, Search, Settings, User } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-neutral-900 text-white w-[35vh] h-screen py-10 border-r border-zinc-700 flex flex-col relative">
      <div className="px-5">
        <h1 className="text-2xl font-bold">Note-App</h1>
        <p className="text-zinc-400 text-sm">
          Your notes, organized and secure.
        </p>
      </div>
      <ul className="mt-8 flex flex-col text-md font-medium">
        <a
          href="/"
          className="hover:bg-neutral-600 transition-colors px-7 py-2 h-12 flex items-center gap-3"
        >
          <FileText className="size-5" />
          Notes
        </a>
        <a
          href="/search"
          className="hover:bg-neutral-600 transition-colors px-7 py-2 h-12 flex items-center gap-3"
        >
          <Search className="size-5" />
          Search
        </a>
        <a
          href="/settings"
          className="hover:bg-neutral-600 transition-colors px-7 py-2 h-12 flex items-center gap-3"
        >
          <Settings className="size-5" />
          Settings
        </a>
      </ul>
      <div className="absolute w-full border-t border-zinc-700 bottom-0 p-4 flex items-center">
        <User />
        <span className="ml-2 text-sm">John Doe</span>
      </div>
    </aside>
  );
};

export default Sidebar;
