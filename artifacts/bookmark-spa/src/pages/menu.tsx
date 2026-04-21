import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogOut, PlusCircle, Search, BookmarkIcon } from "lucide-react";

export default function MenuPage() {
  const navigate = useNavigate();
  const { userId, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2.5 rounded-xl shadow-sm">
              <BookmarkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">ブックマーク管理</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">ログイン中: <span className="font-medium text-slate-700 dark:text-slate-300">{userId}</span></p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-slate-600 dark:text-slate-300"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            ログアウト
          </Button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/register" className="group block focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-2xl" data-testid="link-register">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800 group-hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                  <PlusCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white">ブックマーク登録</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  新しいお気に入りURLを追加して整理します。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-teal-600 dark:text-teal-400 flex items-center">
                  登録画面へ進む <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/search" className="group block focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-2xl" data-testid="link-search">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 group-hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Search className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white">ブックマーク検索</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  登録済みのURLを検索・閲覧・削除します。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center">
                  検索画面へ進む <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
