import {Post} from "@/types/api/post";
import {Album} from "@/types/api/album";
import {Board} from "@/types/api/board";
import {myComment} from "@/types/api/comment";


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
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
    return await res.json();
}

export async function fetchBoard(boardId: string): Promise<Board> {
    const res = await fetch(`http://localhost:3001/boards/${boardId}`);
    return await res.json();
}

export async function fetchComments(boardId: string): Promise<myComment[]>{
    const res = await fetch(`http://localhost:3001/boards/comments/${boardId}`);
    return await res.json();
}


