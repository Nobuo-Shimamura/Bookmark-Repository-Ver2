import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDataStore } from "@/stores/dataStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Search, ArrowLeft, Trash2, ExternalLink, Calendar, Link as LinkIcon, BookMarked } from "lucide-react";
import { format } from "date-fns";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookmarks = useDataStore((state) => state.bookmarks);
  const searchBookmarks = useDataStore((state) => state.search);
  const removeBookmark = useDataStore((state) => state.removeBookmark);
  const load = useDataStore((state) => state.load);
  
  // URL params as state
  const titleParam = searchParams.get("title") || "";
  const dateFromParam = searchParams.get("dateFrom") || "";
  const dateToParam = searchParams.get("dateTo") || "";

  // Local form state
  const [title, setTitle] = useState(titleParam);
  const [dateFrom, setDateFrom] = useState(dateFromParam);
  const [dateTo, setDateTo] = useState(dateToParam);

  useEffect(() => {
    load();
  }, [load]);

  // Sync state when URL changes (e.g. back button)
  useEffect(() => {
    setTitle(titleParam);
    setDateFrom(dateFromParam);
    setDateTo(dateToParam);
  }, [titleParam, dateFromParam, dateToParam]);

  // Handle form submit to update URL parameters
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    setSearchParams(params);
  };

  // Handle clear form
  const handleClear = () => {
    setTitle("");
    setDateFrom("");
    setDateTo("");
    setSearchParams(new URLSearchParams());
  };

  // Perform search based on URL params (re-runs when bookmarks store changes)
  const results = useMemo(() => {
    return searchBookmarks({
      title: titleParam,
      dateFrom: dateFromParam,
      dateTo: dateToParam,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBookmarks, titleParam, dateFromParam, dateToParam, bookmarks]);

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" data-testid="button-back">
            <Link to="/menu">
              <ArrowLeft className="w-4 h-4 mr-2" />
              メニューへ戻る
            </Link>
          </Button>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 shadow-sm mb-8">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                <Search className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <CardTitle className="text-lg">検索条件</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-300">タイトル</label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="キーワード"
                    className="h-10 bg-white dark:bg-slate-900"
                    data-testid="input-search-title"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dateFrom" className="text-sm font-medium text-slate-700 dark:text-slate-300">登録日 (From)</label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="h-10 bg-white dark:bg-slate-900"
                    data-testid="input-search-date-from"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dateTo" className="text-sm font-medium text-slate-700 dark:text-slate-300">登録日 (To)</label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="h-10 bg-white dark:bg-slate-900"
                    data-testid="input-search-date-to"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClear}
                  data-testid="button-search-clear"
                >
                  クリア
                </Button>
                <Button 
                  type="submit" 
                  className="bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-200 dark:hover:bg-slate-300 dark:text-slate-900"
                  data-testid="button-search-submit"
                >
                  <Search className="w-4 h-4 mr-2" />
                  検索する
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            検索結果 <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">({results.length}件)</span>
          </h2>

          {results.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white/50 dark:bg-slate-900/50">
              <BookMarked className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">ブックマークが見つかりませんでした。</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {results.map((bookmark) => (
                <Card key={bookmark.id} className="group overflow-hidden transition-all hover:border-teal-200 dark:hover:border-teal-800 shadow-sm" data-testid={`card-bookmark-${bookmark.id}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="font-medium text-slate-900 dark:text-white truncate" title={bookmark.title}>
                        {bookmark.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <a 
                          href={bookmark.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400 transition-colors truncate max-w-[200px] sm:max-w-[300px]"
                          title={bookmark.url}
                          data-testid={`link-bookmark-${bookmark.id}`}
                        >
                          <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{bookmark.url}</span>
                        </a>
                        <div className="flex items-center gap-1 shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{format(new Date(bookmark.createdAt), "yyyy/MM/dd HH:mm")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button 
                        variant="outline" 
                        size="icon"
                        asChild
                        className="h-9 w-9 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" title="開く">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeBookmark(bookmark.id)}
                        className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50"
                        title="削除"
                        data-testid={`button-delete-${bookmark.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
