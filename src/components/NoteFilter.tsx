import { Search, X, ArrowUp, ArrowDown, RotateCcw, Filter } from "lucide-react";

export type SortOption = "updatedAt" | "createdAt" | "title";
export type SortOrder = "asc" | "desc";
export type SearchScope = "all" | "title" | "content";
export type DateFilter = "all" | "7days" | "30days";

interface NoteFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortByChange: (sortBy: SortOption) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  scope: SearchScope;
  onScopeChange: (scope: SearchScope) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const NoteFilter = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  scope,
  onScopeChange,
  dateFilter,
  onDateFilterChange,
  onResetFilters,
  totalResults,
}: NoteFilterProps) => {
  const isFilterActive =
    searchQuery !== "" ||
    sortBy !== "updatedAt" ||
    sortOrder !== "desc" ||
    scope !== "all" ||
    dateFilter !== "all";

  return (
    <div className="w-full h-full bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-100 font-semibold text-lg">
          <Filter className="size-5 text-indigo-400" />
          <span>Search & Filter</span>
        </div>
        {isFilterActive && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-indigo-400 transition-colors"
            title="Reset filters"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Search Query
        </label>
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500 rounded-lg pl-9 pr-9 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 text-zinc-400 hover:text-zinc-200 transition"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Scope */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Search Scope
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {(
            [
              { id: "all", label: "All" },
              { id: "title", label: "Title" },
              { id: "content", label: "Content" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => onScopeChange(item.id)}
              className={`py-1.5 text-xs font-medium rounded-md transition ${
                scope === item.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Settings */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Sort By
        </label>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortOption)}
            className="flex-1 bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm rounded-lg p-2 focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            <option value="updatedAt">Date Modified</option>
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
          </select>
          <button
            onClick={() =>
              onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
            }
            className="bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-indigo-400 hover:border-zinc-600 p-2 rounded-lg flex items-center justify-center transition"
            title={`Sort ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
          >
            {sortOrder === "asc" ? (
              <ArrowUp className="size-4" />
            ) : (
              <ArrowDown className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Date Range
        </label>
        <div className="flex flex-col gap-1.5">
          {(
            [
              { id: "all", label: "All Time" },
              { id: "7days", label: "Last 7 Days" },
              { id: "30days", label: "Last 30 Days" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => onDateFilterChange(item.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition flex items-center justify-between ${
                dateFilter === item.id
                  ? "bg-indigo-950/40 border-indigo-600 text-indigo-200"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <span>{item.label}</span>
              {dateFilter === item.id && (
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
        <span>Matching Notes</span>
        <span className="bg-zinc-800 text-indigo-300 px-2.5 py-0.5 rounded-full font-medium">
          {totalResults} {totalResults === 1 ? "note" : "notes"}
        </span>
      </div>
    </div>
  );
};

export default NoteFilter;

