"use client";

import { useState } from "react";
import {redirect} from "next/navigation";

interface RegisterInfo {
    name: string;
    email: string;
    password: string;
}

export default function RegisterPage() {

    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
        name: "",
        email: "",
        password: "",
    });
    const {name, email, password} = registerInfo;

    function postRegister() {

        (async () => {
            await fetch("http://localhost:3001/users/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: registerInfo.name,
                    email: registerInfo.email,
                    password: registerInfo.password,
                })
            });
        })();

        return redirect("http://localhost:3000/login");
    }

    function onChange(e:any) {
        const { value, name } = e.target;
        setRegisterInfo({ ...registerInfo, [name]: value });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="홍길동"
                            value={name}
                            onChange={onChange}/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="email@example.com"
                            value={email}
                            onChange={onChange}/>
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
                        formMethod="POST"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                            onClick={() => {postRegister()}}>
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
}
