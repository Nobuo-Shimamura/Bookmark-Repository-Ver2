export interface Bookmark {
  id: string;
  title: string;
  url: string;
  createdAt: string;
}

export interface SearchParams {
  title?: string;
  dateFrom?: string;
  dateTo?: string;
}
