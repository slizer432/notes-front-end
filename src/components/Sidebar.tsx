const Sidebar = () => {
  return (
    <aside className="bg-neutral-900 text-white w-[30vh] h-screen px-4 py-8 border-r border-zinc-700 fixed">
      <div>
        <h1 className="text-2xl font-bold">Note-App</h1>
        <p className="text-zinc-400 text-sm">
          Your notes, organized and secure.
        </p>
      </div>
      <ul className="mt-8 flex flex-col gap-5 text-xl font-medium">
        <li>Notes</li>
        <li>Search</li>
        <li>Settings</li>
        <li>Help</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
