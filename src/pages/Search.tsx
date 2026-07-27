import { useEffect, useMemo, useState } from "react";
import NoteFilter, {
  type DateFilter,
  type SearchScope,
  type SortOption,
  type SortOrder,
} from "../components/NoteFilter";
import NoteViewer from "../components/NoteViewer";
import NoteList from "../components/NoteList";
import type { Note } from "../types/Note";
import { deleteNote, getNotes, updateNote } from "../helper/noteApi";
import ConfirmModal from "../components/ConfirmModal";
import NoteEditor from "../components/NoteEditor";

const Search = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [scope, setScope] = useState<SearchScope>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };

    fetchNotes();
  }, [isEdit]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortBy("updatedAt");
    setSortOrder("desc");
    setScope("all");
    setDateFilter("all");
  };

  const filteredAndSortedNotes = useMemo(() => {
    let result = [...notes];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((note) => {
        const titleMatch = note.title?.toLowerCase().includes(q);
        const contentMatch = note.content?.toLowerCase().includes(q);
        if (scope === "title") return titleMatch;
        if (scope === "content") return contentMatch;
        return titleMatch || contentMatch;
      });
    }

    // 2. Date Range Filter
    if (dateFilter !== "all") {
      const now = new Date().getTime();
      const days = dateFilter === "7days" ? 7 : 30;
      const cutoff = now - days * 24 * 60 * 60 * 1000;
      result = result.filter((note) => {
        const noteDate = new Date(note.updatedAt || note.createdAt).getTime();
        return !isNaN(noteDate) && noteDate >= cutoff;
      });
    }

    // 3. Sorting
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "title") {
        cmp = (a.title || "").localeCompare(b.title || "");
      } else {
        const dateA = new Date(a[sortBy] || a.createdAt || 0).getTime();
        const dateB = new Date(b[sortBy] || b.createdAt || 0).getTime();
        cmp = dateA - dateB;
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [notes, searchQuery, sortBy, sortOrder, scope, dateFilter]);

  const handleUpdateNote = async () => {
    if (!selectedNote) return;

    await updateNote(selectedNote);
    setIsEdit(false);
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    await deleteNote(selectedNote.id);
    setNotes(notes.filter((note) => note.id !== selectedNote.id));
    setSelectedNote(undefined);
    setDeleteModal(false);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black text-white">
      {/* Search & Filter Options Sidebar */}
      <div className="w-80 h-full shrink-0">
        <NoteFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          scope={scope}
          onScopeChange={setScope}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          onResetFilters={handleResetFilters}
          totalResults={filteredAndSortedNotes.length}
        />
      </div>

      {/* Filtered Notes List */}
      <div className="w-80 h-full shrink-0">
        <NoteList
          notes={filteredAndSortedNotes}
          selectedNoteId={selectedNote?.id}
          onNoteSelect={setSelectedNote}
          title="Search Results"
        />
      </div>

      {/* Main Content Area: Viewer or Editor */}
      <div className="flex-1 h-full overflow-y-auto">
        {isEdit ? (
          <NoteEditor
            note={selectedNote}
            setNote={setSelectedNote}
            action={handleUpdateNote}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        ) : (
          <NoteViewer
            note={selectedNote}
            setIsEdit={setIsEdit}
            setDeleteModal={setDeleteModal}
          />
        )}
      </div>

      {deleteModal && (
        <ConfirmModal
          message="Are you sure you want to delete this note?"
          onConfirm={handleDeleteNote}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Search;

