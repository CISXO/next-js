
import {fetchPosts} from "@/services/post-service";

import AlbumList from "@/components/blocks/albumList";



export default async function AlbumDetailPage() {

    return (
        <div className="container mx-auto text-center p-8">
            <h1 className="text-3xl font-bold underline">Album 상세 페이지</h1>
            <p className="mt-4 text-lg"> 여기는 album 상세 페이지</p>
            <div>
                <AlbumList/>
            </div>
        </div>
    );
}