import { Bookmark, SearchParams } from "@/types/bookmark";

const STORAGE_KEY = "bookmarks";

export class BookmarkRepository {
  private load(): Bookmark[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Bookmark[]) : [];
    } catch {
      return [];
    }
  }

  private save(bookmarks: Bookmark[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  fetchBookmarks(): Bookmark[] {
    return this.load();
  }

  saveBookmark(data: Omit<Bookmark, "id" | "createdAt">): Bookmark {
    const bookmarks = this.load();
    const newBookmark: Bookmark = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: data.title,
      url: data.url,
      createdAt: new Date().toISOString(),
    };
    bookmarks.push(newBookmark);
    this.save(bookmarks);
    return newBookmark;
  }

  deleteBookmark(id: string): void {
    const bookmarks = this.load().filter((b) => b.id !== id);
    this.save(bookmarks);
  }

  searchBookmarks(params: SearchParams): Bookmark[] {
    const bookmarks = this.load();
    return bookmarks.filter((b) => {
      if (params.title && !b.title.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }
      if (params.dateFrom) {
        const from = new Date(params.dateFrom);
        from.setHours(0, 0, 0, 0);
        if (new Date(b.createdAt) < from) return false;
      }
      if (params.dateTo) {
        const to = new Date(params.dateTo);
        to.setHours(23, 59, 59, 999);
        if (new Date(b.createdAt) > to) return false;
      }
      return true;
    });
  }
}

export const bookmarkRepository = new BookmarkRepository();
