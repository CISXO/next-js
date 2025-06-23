"use client"

import {useEffect, useState} from "react";
import {redirect} from "next/navigation";

interface loginInfo{
    email: string,
    password: string,
}

export default function LoginPage() {
    const [loginInfo, setLoginInfo] = useState<loginInfo>({
        email: "",
        password: "",
    })


    const {email, password} = loginInfo;

    function onChange(e:any) {
        const { value, name } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }

    function postLogin() {
        try {
        (async () => {
            await fetch("http://localhost:3001/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginInfo.email,
                    password: loginInfo.password,
                }),
                credentials: "include",
            });
        })();
            return redirect("http://localhost:3000");
        } catch (error) {
            console.log(error);
        }
        return redirect("http://localhost:3000");

    }


    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="email@example.com"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="********"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                            <button
                                type="button"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                                onClick={() => {postLogin()}}>
                                로그인
                            </button>
                    </form>
                </div>
            </div>
        </div>
    );
}