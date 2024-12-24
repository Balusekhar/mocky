import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Code2, User2, Calendar } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="h-8 w-72 bg-muted rounded-lg animate-pulse mb-6" />

      {/* Interview Summary Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-muted animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <User2 className="w-4 h-4 text-muted animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted animate-pulse" />
              <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-6 w-24 bg-muted rounded-full animate-pulse ml-auto" />
          </div>
        </CardContent>
      </Card>

      {/* AI Feedback Card */}
      <Card className="mb-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/50 dark:to-pink-950/50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-muted animate-pulse" />
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-[90%] bg-muted rounded animate-pulse" />
            <div className="h-4 w-[95%] bg-muted rounded animate-pulse" />
            <div className="h-4 w-[85%] bg-muted rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Q&A Card */}
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                </div>
                <div className="h-24 w-full bg-muted/50 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
