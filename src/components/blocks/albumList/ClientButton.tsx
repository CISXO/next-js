"use client"


import {Album} from "@/types/api/album";
import {useEffect, useState} from "react";


export default function PostItem({album}: { album: Album }) {

    const [stateView, setStateView] = useState(false);

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
    )
};
