import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Comment } from "@/lib/types/blog";

interface CommentCardProps {
    comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
    // Get initials from email
    const initials = comment.email
        .split('@')[0]
        .substring(0, 2)
        .toUpperCase();

    return (
        <Card className="border-l-4 border-l-primary/50">
            <CardHeader>
                <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-primary font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-semibold leading-none">{comment.name}</h4>
                        <p className="text-xs text-muted-foreground">{comment.email}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    {comment.body}
                </p>
            </CardContent>
        </Card>
    );
}
