
import {fetchAlbum} from "@/services/post-service";

import ClientButton from "@/components/blocks/albumList/ClientButton";
import {Album} from "@/types/api/album";

export interface AlbumDetailPageProps {
    params: Promise<{
        albumId: string;
    }>;
}

// {} props 자체로 받는 것은 Promise 객체이다.
export default async function AlbumDetailPage({params}: AlbumDetailPageProps) {

    const {albumId} = await params;

    const album:Album = await fetchAlbum(albumId);

    return (
        <div className="container mx-auto text-center p-8">
            <h1 className="text-3xl font-bold underline">게시글 상세 페이지</h1>
            <p className="mt-4 text-lg"> 여기는 게시글 상세 페이지</p>
            <ClientButton album={album} />
        </div>
    );
}


export async function generateStaticParams() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums`);
    const data = await response.json();
    return data.map((album: Album) => {
        return {
            albumId: album.id.toString(),
        }
    })
}