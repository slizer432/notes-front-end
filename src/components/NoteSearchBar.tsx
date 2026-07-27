import { Search, X } from "lucide-react";

interface NoteSearchBarProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

const NoteSearchBar = ({
  value = "",
  onChange,
  placeholder = "Search notes...",
}: NoteSearchBarProps) => {
  return (
    <div className="w-full h-16 bg-zinc-900 border-b border-zinc-800 px-6 flex items-center gap-3">
      <Search className="size-5 text-zinc-400 shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full bg-transparent text-zinc-200 placeholder:text-zinc-500 text-sm focus:outline-none"
      />
      {value && onChange && (
        <button
          onClick={() => onChange("")}
          className="text-zinc-500 hover:text-zinc-300 transition"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};

export default NoteSearchBar;

