import { FileText, PlusCircle, Search, User } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfilePopUp from "./ProfilePopUp";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/JwtPayload";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  let payload: JwtPayload | null = null;
  if (token !== null) {
    try {
      payload = jwtDecode(token);
    } catch {
      payload = null;
    }
  }

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all px-6 py-3 h-12 flex items-center gap-3 font-medium text-sm border-l-4 ${
      isActive
        ? "bg-zinc-800/90 text-indigo-400 border-indigo-500 font-semibold"
        : "border-transparent text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
    }`;

  return (
    <aside className="bg-neutral-900 text-white w-[45vh] max-w-[280px] min-w-[220px] h-screen py-8 border-r border-zinc-800 flex flex-col relative shrink-0">
      <div className="px-6 mb-2">
        <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          {/* <span className="bg-indigo-600 text-white p-1 rounded-md text-xs">
            NA
          </span> */}
          <span>Note-App</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-1">
          Your notes, organized and secure.
        </p>
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        <NavLink to="/home" className={getNavLinkClass}>
          <FileText className="size-4" />
          <span>Notes</span>
        </NavLink>
        <NavLink to="/search" className={getNavLinkClass}>
          <Search className="size-4" />
          <span>Search</span>
        </NavLink>
        <NavLink to="/create-note" className={getNavLinkClass}>
          <PlusCircle className="size-4" />
          <span>New Note</span>
        </NavLink>
      </nav>

      <div className="absolute w-full border-t border-zinc-800 bottom-0 p-4 flex items-center">
        {isOpen && (
          <div className="absolute bottom-16 left-4 bg-neutral-800 rounded-md shadow-lg w-48 border border-zinc-700 z-50">
            <ProfilePopUp />
          </div>
        )}
        <div
          className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-zinc-800/60 w-full transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="size-8 rounded-full bg-indigo-900/60 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
            <User className="size-4" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-medium text-zinc-200 truncate">
              {payload ? payload.unique_name : "User"}
            </span>
            <span className="text-[10px] text-zinc-500">View Profile</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
