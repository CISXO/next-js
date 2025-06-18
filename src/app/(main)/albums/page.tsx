
import {fetchAlbums} from "@/services/post-service";
import {Album} from "@/types/api/album";



export default async function AlbumDetailPage() {


    const album = await fetchAlbums();

    return (
        <div className="container mx-auto text-center p-8">
            <h1 className="text-3xl font-bold underline">Album 상세 페이지</h1>
            <p className="mt-4 text-lg"> 여기는 album 상세 페이지</p>
            <div>
                <ul>
                    {album.map((item:Album, index: number) => {
                        return (
                            <li key={index}>
                                {item.title}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}