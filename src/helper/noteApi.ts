import axiosClient from "../api/axiosClient";
import type { Note } from "../types/Note";

export const getNotes = async () => {
  const response = await axiosClient.get<Note[]>("/notes");

  return response.data;
};

export const createNote = async (note: Partial<Note>) => {
  const response = await axiosClient.post("/notes", note);

  return response.data;
};

export const updateNote = async (note: Note) => {
  const response = await axiosClient.put(`/notes/${note.id}`, note);

  return response.data;
};

export const deleteNote = async (noteId: string) => {
  await axiosClient.delete(`/notes/${noteId}`);
};
