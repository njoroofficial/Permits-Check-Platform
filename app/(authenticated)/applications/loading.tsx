import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingApplications() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-9 w-64 bg-muted animate-pulse rounded-md" />
          <div className="h-5 w-48 bg-muted animate-pulse rounded-md" />
        </div>
        <div className="h-10 w-40 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Filter skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="h-9 flex-1 max-w-sm bg-muted animate-pulse rounded-md" />
        <div className="h-9 w-[180px] bg-muted animate-pulse rounded-md" />
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
                </div>
                <div className="h-6 w-20 bg-muted animate-pulse rounded-md" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-5 w-full bg-muted animate-pulse rounded-md" />
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 bg-muted animate-pulse rounded-md" />
                <div className="h-5 w-28 bg-muted animate-pulse rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
