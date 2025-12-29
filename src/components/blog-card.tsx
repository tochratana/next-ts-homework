import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/types/blog";

interface BlogCardProps {
    post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/dashboard/blog/${post.id}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                            #{post.id}
                        </Badge>
                    </div>
                    <CardDescription className="line-clamp-3 mt-2">
                        {post.body}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">User {post.userId}</Badge>
                        <span>•</span>
                        <span className="text-xs">Click to read more</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
