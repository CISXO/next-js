"use client";

import { fetchAlbum } from "@/services/post-service";

import { useEffect, useState } from "react";
import {Album} from "@/types/api/album";


interface AlbumItemClientProps {
    params: Promise<{
        albumId: string;
    }>;
}

export default function AlbumItemClient({ params }: AlbumItemClientProps) {


    const [album, setAlbum] = useState<Album | null>(null);

    const [stateView, setStateView] = useState(false);

    useEffect(() => {
        (async () => {
            const paramResolve = await params;
            fetchAlbum(paramResolve.albumId).then((data) => {
                setAlbum(data);
            });
        })();
    }, [album]);


    function changeButton() {
        setStateView(!stateView);
    }


    return (
        <div className="container mx-auto text-center p-5">
            <button onClick={() => changeButton()}>
                버튼
            </button>
            {stateView ? (
                <div>
                    <p>{album && album.title}</p> {/* 작성 */}
                </div>
            ) : (
                <div>

                </div>

            )}
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