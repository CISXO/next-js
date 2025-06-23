"use client"
import { Button } from '@/components/ui/button';

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {CardFooter} from "react-bootstrap";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {fetchBoard, fetchComments} from "@/services/post-service";
import { useUser } from "@/components/islogin/UserContext";
import {Board} from "@/types/api/board";
import {myComment} from "@/types/api/comment";
import {useRouter} from "next/navigation";

export interface boardDetailPage {
    params: Promise<{
        boardsId: string;
    }>;
}
//interface는 타입 재정의가 가능함// interface 권장하기 때문

// {} props 자체로 받는 것은 Promise 객체이다.
export default function PostDetailPage({ params }: boardDetailPage) {

    const router = useRouter();

    const [editingKey, setEditingKey] = useState("");

    const [editComment, setEditComment] = useState("");

    const [editText, setEditText] = useState<string>("");

    const [boardInfo, setBoardInfo] = useState<Board | null>(null);

    const [comments, setComments] = useState<myComment[] | null>(null);

    const { name } = useUser();


    useEffect(() => {
        (async () => {
            const board = await params;
            console.log(board);
            const myBoard:Board = await fetchBoard(board.boardsId);
            const myComment:myComment[] = await fetchComments(board.boardsId);
            setBoardInfo(myBoard);

            setEditText(myBoard.content)
            setComments(myComment);

        })();


    }, []);
    useEffect(() => {

    }, [editComment]);



    function onUpdate(boardId: string | undefined, editText: string) {
        const alertGo = confirm("수정 하시겟습니까?");

        if(alertGo){
            (async () => {
                await fetch(`http://localhost:3001/boards/${boardId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: editText
                    })
                });
            })();

            setEditingKey("");
            redirect("/boards");
            window.location.reload();

        }
    }

    function onDelete(boardId: string | undefined) {
        console.log(boardId);
        const alertGo = confirm("Are you sure Delete?");

        if(alertGo){
            (async () => {
                await fetch(`http://localhost:3001/boards/${boardId}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            })();

            setEditingKey("");

            redirect("/boards");
        }

    }

    function onCommentPost(_id: string | undefined, edditComment: string) {
        const alertGo = confirm("댓글 전송하시겠습니까?");
        if(alertGo){
            (async () => {
                console.log(_id);
                await fetch(`http://localhost:3001/boards/comments/${_id}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        writer: name,
                        comment: edditComment
                    })
                });
            })();

            setEditingKey("");
            setEditComment("");
            setEditText("");
            // redirect(`/boards/${_id}`);

            router.push(`/boards/${_id}`);

            window.location.reload();

        }

    }

    return (
        <div className="container mx-auto text-center p-8">
            <h1 className="text-3xl font-bold underline">게시글 상세 페이지</h1>
            <div>
                <Card >
                    <CardHeader className="border-2 border-gray-400 rounded-xl mb-4 mt-2">
                        {boardInfo?.title}
                    </CardHeader>
                    <CardContent>
                        <Textarea className="w-full h-[300px]" value={editText} onChange={(e) => setEditText(e.target.value)} />
                    </CardContent>

                    <CardFooter className="border-2 border-gray-400 rounded-xl mb-4 mt-2">
                        <Button className="btn_update" variant="secondary" onClick={()=> {onUpdate(boardInfo?._id, editText)}}>
                            수정하기
                        </Button>
                        <Button className="btn_close" variant="secondary" onClick={() => onDelete(boardInfo?._id)}>
                            삭제
                        </Button>
                    </CardFooter>

                    <CardContent>
                        <div className="text-3xl font-bold">
                            댓글 목록
                        </div>
                        <div>
                            {comments?.map((item: any, index: number) => (
                                <div key={index}>
                                    <Card className="text-left">
                                        <CardHeader>
                                            <CardTitle className="text-2xl">{item.writer}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-base text-gray-700 h-[20px] truncate">{item.comment}</p>
                                            <p className="text-base text-gray-700 h-[50px] truncate">{item.createdAt}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))
                            }
                        </div>

                        <div>

                            <div className="text-3xl font-bold">
                                댓글 달기
                            </div>
                            <Textarea className="w-full " onChange={(e) => setEditComment(e.target.value)}>
                            </Textarea>
                            <Button formMethod="POST" className="btn_update" variant="secondary" onClick={()=> {onCommentPost(boardInfo?._id, editComment)}}>
                                댓글 전송
                            </Button>

                        </div>

                    </CardContent>

                </Card>

            </div>
        </div>
    );
}