import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useDataStore } from "@/stores/dataStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, BookmarkIcon } from "lucide-react";

const registerSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  url: z.string().min(1, "URLを入力してください").url("正しいURL形式で入力してください"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const addBookmark = useDataStore((state) => state.addBookmark);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    addBookmark(data);
    toast({
      title: "登録完了",
      description: "ブックマークを登録しました。",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" data-testid="button-back">
            <Link to="/menu">
              <ArrowLeft className="w-4 h-4 mr-2" />
              メニューへ戻る
            </Link>
          </Button>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-teal-50 dark:bg-teal-900/30 p-2 rounded-lg">
                <BookmarkIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <CardTitle className="text-xl">ブックマーク登録</CardTitle>
                <CardDescription>新しいウェブサイトを保存します</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300">タイトル <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="例: React公式ドキュメント" 
                            {...field} 
                            className="h-11 bg-white dark:bg-slate-900"
                            data-testid="input-title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300">URL <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://react.dev" 
                            type="url"
                            {...field} 
                            className="h-11 bg-white dark:bg-slate-900"
                            data-testid="input-url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto h-11 px-8 bg-teal-600 hover:bg-teal-700 text-white"
                    data-testid="button-submit"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存する
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
