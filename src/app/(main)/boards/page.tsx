"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // shadcn 카드 컴포넌트
import {redirect} from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Album } from "@/types/api/album";
import {CardFooter} from "react-bootstrap";
import {Button} from "@/components/ui/button";
import {router} from "next/client";

export default function BoardItemClient() {
    const [myBoard, setMyBoard] = useState([]);

    const [editText, setEditText] = useState("");
    const [editingKey, setEditingKey] = useState("");

    const [newText, setNewText] = useState("");

    const [newTitle, setNewTitle] = useState("");

    const [newFlag, setNewFlag] = useState(false);

    const [isPop, setIsPop] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    function goChangeFlag() {
        if(newFlag){
            setNewFlag(false);
        } else {
            setNewFlag(true);

        }
    }

    function postText(myTitle:any, myText:any) {
        const alertGo = confirm("Are you sure you want to post?");

        if(alertGo){
            (async () => {
                await fetch("http://localhost:3001/boards", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: myTitle,
                        content: myText
                    })
                });
            })();

            console.log(myTitle);
            console.log(myText);

            setNewText("");
            setNewTitle("");
            setEditingKey("");
            setNewFlag(false);

        }
        return redirect("http://localhost:3000/boards");
    }


    useEffect(() => {

    },[newFlag])

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3001/boards");
            const data = await res.json();
            setMyBoard(data);
        })();

    }, []);

    function goViewBoard(boardId: any) {
        setEditingKey(boardId)
        // setEditText(myText);
        // router.push(`/boards/${boardId}`);
        return redirect("/boards/" + boardId);
        // setIsPop(true);
        // setShow(true);
    }


    function onUpdate(boardId:any, editText: string) {
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
        }
    }

    function onDelete(boardId:any) {
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

            setNewText("");
            setNewTitle("");
            setNewFlag(false);
            setEditingKey("");
            redirect("/boards");
        }

    }

    return (
        <div className="container mx-auto text-center p-5 mt-8">
            <div className="text-6xl text-green-500 font-bold mb-8">게시판</div>
            <div className="">
                {newFlag === true ? (
                    <div>
                        <div className="flex justify-end">
                            <h5 className="cursor-pointer border-2 border-gray-400 rounded-xl p-2 mb-4" onClick={() =>(goChangeFlag())}>취소</h5>
                        </div>
                        <div className="border-2 border-gray-400 rounded-xl mb-2">
                            <input type="text"
                                   placeholder="제목을 작성하세요!"
                                   className="w-full h-[30px]"
                                   value={newTitle}
                                   onChange={(e) => setNewTitle(e.target.value)}/>
                        </div>

                        <div className="">
                            <Textarea typeof="text"
                                      placeholder="내용을 작성하셈!"
                                      className="w-full h-[400px] cursor-pointer p-2"
                                      value={newText}
                                      onChange={(e) => setNewText(e.target.value)} />
                        </div>
                        <div className="flex justify-end">
                            <div className=" border-2 border-gray-400 rounded-xl mb-4 mt-2">
                                <button type="button" className=" p-2" onClick={()=> (postText(newTitle, newText))}>전송</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end">
                        <h5 className="cursor-pointer border-2 border-gray-400 rounded-xl p-2 mb-4 " onClick={() =>(goChangeFlag())}>글쓰기</h5>

                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBoard.map((item: any, index: number) => (
                    <div key={index}>
                        <Card className="text-left" onClick={() => goViewBoard(item._id)}>
                            <CardHeader>
                                <CardTitle className="text-2xl">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-gray-700 h-[300px] truncate">{item.content}</p>
                            </CardContent>
                        </Card>


                    </div>
                ))}
            </div>
        </div>
    );
}
