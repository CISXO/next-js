"use client"

import {useEffect, useState} from "react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

export default function IsLogg() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log("isLoggedIn", isLoggedIn);

        fetch("http://localhost:3001/users/protected", {
            credentials: "include",
        }).then((res) => res.json())
            .then((data) => {
                if (data.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(() => setIsLoggedIn(false));
    }, []);

    async function postLogout() {
        await fetch("http://localhost:3001/users/logout", {
            method: "POST",
            credentials: "include",
        });
    }

    return (
        <>
            {isLoggedIn ? (
                <div>
                    <DropdownMenuItem><div onClick={()=>postLogout()}>로그아웃</div></DropdownMenuItem>
                </div>
            ):(
                <>
                    <DropdownMenuItem><a href="/login">로그인</a></DropdownMenuItem>
                </>
            )}
        </>
    );
}