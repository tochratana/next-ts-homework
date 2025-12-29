import { use, Suspense } from "react";
import Link from "next/link";
import { fetchPost, fetchComments } from "@/lib/data/data";
import { CommentCard } from "@/components/comment-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogDetailPageProps {
    params: Promise<{ slug: string }>;
}

function PostContent({ postId }: { postId: string }) {
    const post = use(fetchPost(postId));

    return (
        <article className="bg-card rounded-xl border-2 shadow-lg p-8 md:p-12">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="outline">Post #{post.id}</Badge>
                        <span>•</span>
                        <Badge variant="secondary">User {post.userId}</Badge>
                    </div>
                </div>
            </div>

            <Separator className="my-6" />

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                    {post.body}
                </p>
            </div>
        </article>
    );
}

function CommentsSection({ postId }: { postId: string }) {
    const comments = use(fetchComments(postId));

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">
                    Comments ({comments.length})
                </h2>
            </div>

            <div className="space-y-4">
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}

function PostSkeleton() {
    return (
        <div className="space-y-4 bg-card rounded-xl border-2 shadow-lg p-8 md:p-12">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-px w-full my-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}

function CommentsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
        </div>
    );
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/dashboard/blog">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                    <ThemeToggle />
                </div>

                {/* Post Content */}
                <Suspense fallback={<PostSkeleton />}>
                    <PostContent postId={slug} />
                </Suspense>

                {/* Comments Section */}
                <div className="mt-12">
                    <Suspense fallback={<CommentsSkeleton />}>
                        <CommentsSection postId={slug} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
