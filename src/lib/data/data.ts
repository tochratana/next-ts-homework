import { Post, Comment } from '../types/blog';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export function fetchPosts(): Promise<Post[]> {
    return fetch(`${API_BASE}/posts`, {
        cache: 'force-cache',
    }).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
    });
}

export function fetchPost(id: string | number): Promise<Post> {
    return fetch(`${API_BASE}/posts/${id}`, {
        cache: 'force-cache',
    }).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch post');
        return res.json();
    });
}

export function fetchComments(postId: string | number): Promise<Comment[]> {
    return fetch(`${API_BASE}/posts/${postId}/comments`, {
        cache: 'force-cache',
    }).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch comments');
        return res.json();
    });
}
