import { create } from "zustand";
import { Bookmark, SearchParams } from "@/types/bookmark";
import { bookmarkRepository } from "@/lib/repository";

interface DataState {
  bookmarks: Bookmark[];
  load: () => void;
  addBookmark: (data: Omit<Bookmark, "id" | "createdAt">) => Bookmark;
  removeBookmark: (id: string) => void;
  search: (params: SearchParams) => Bookmark[];
}

export const useDataStore = create<DataState>()((set, get) => ({
  bookmarks: [],

  load: () => {
    const bookmarks = bookmarkRepository.fetchBookmarks();
    set({ bookmarks });
  },

  addBookmark: (data) => {
    const newBookmark = bookmarkRepository.saveBookmark(data);
    set((state) => ({ bookmarks: [...state.bookmarks, newBookmark] }));
    return newBookmark;
  },

  removeBookmark: (id) => {
    bookmarkRepository.deleteBookmark(id);
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    }));
  },

  search: (params: SearchParams) => {
    return bookmarkRepository.searchBookmarks(params);
  },
}));
