import React from "react";

type MainLayoutProps = {
    children: React.ReactNode;
}

export default function MainLayout({children}: MainLayoutProps) {
    return (
        <div>
            <div className="bg-blue-200"> Main Layout Header</div>
            {children}
            <div className="mt-8 text-center bg-red-200"> main layout footer</div>
        </div>
    )
}