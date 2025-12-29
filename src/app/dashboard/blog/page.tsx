import { use, Suspense } from "react";
import { fetchPosts } from "@/lib/data/data";
import { BlogCard } from "@/components/blog-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";

function BlogList() {
    const posts = use(fetchPosts());

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
    );
}

function BlogListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                            Blog Posts
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Explore our collection of inspiring articles
                        </p>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Blog Grid */}
                <Suspense fallback={<BlogListSkeleton />}>
                    <BlogList />
                </Suspense>
            </div>
        </div>
    );
}
