// contexts/UserContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

// 타입: 오직 name만
type UserContextType = {
    name: string;
    setName: (name: string) => void;
};

const UserContext = createContext<UserContextType>({
    name: "익명",       // 기본값
    setName: () => {}, // 빈 함수
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [name, setName] = useState<string>("익명");

    // 자동 로그인 시 name 설정
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("http://localhost:3001/users/protected", {
                    credentials: "include",
                });
                const data = await res.json();

                if (data.isLoggedIn && data.user?.name) {
                    setName(data.user.name);
                }
            } catch (err) {
                console.log("자동 로그인 실패");
            }
        })();
    }, []);

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    );
}
