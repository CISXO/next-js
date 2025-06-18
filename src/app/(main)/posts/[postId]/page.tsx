import PostItem from "@/components/blocks/postItem";
import {fetchPost} from "@/services/post-service";

export interface PostDetailPageProps {
    params: Promise<{
        postId: string;
    }>;
}
//interface는 타입 재정의가 가능함// interface 권장하기 때문

// {} props 자체로 받는 것은 Promise 객체이다.
export default async function PostDetailPage({params}: PostDetailPageProps) {

    const {postId} = await params;

    const post = await fetchPost(postId);

    return (
        <div className="container mx-auto text-center p-8">
            <h1 className="text-3xl font-bold underline">게시글 상세 페이지</h1>
            <p className="mt-4 text-lg"> 여기는 게시글 상세 페이지</p>
            <p>title: {post.title}</p>
            <div>
                <PostItem postId={postId}/>
            </div>
        </div>
    );
}