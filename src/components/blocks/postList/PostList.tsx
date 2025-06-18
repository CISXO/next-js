import PostListClient from "./PostList.client";

export default function PostList() {

    //오직 서버에서만 실행도미
    //브라우저에서 실행되는 코드를 이곳에서 작성 불가
    console.log("PostList server component!");
    
    return <PostListClient/>
}