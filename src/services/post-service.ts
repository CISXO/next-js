import {Post} from "@/types/api/post";
import {Album} from "@/types/api/album";


export async function fetchPosts(): Promise<Post> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await res.json();
}

export async function fetchPost(postId: string): Promise<Post> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return await res.json();
}


export async function fetchAlbums(): Promise<Album[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/albums");
    return await res.json();
}

export async function fetchAlbum(albumId: string): Promise<Album> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${albumId}`);
    return await res.json();
}


