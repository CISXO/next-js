"use client";

import {fetchAlbums} from "@/services/post-service";

import { useEffect, useState } from "react";
import {Album} from "@/types/api/album";

export default function AlbumItemClient() {

    const [album, setAlbum] = useState<Album[]>([]);

    useEffect(() => {
        fetchAlbums().then((data) => {
            setAlbum(data);
        });
    }, []);

    return (
        <div className="container mx-auto text-center p-5">
            <ul>
                {album.map((item, index: number) => {

                    return (
                        <li key={index}>
                            {item.title}
                        </li>
                    );
                })}

            </ul>
        </div>
    );
}