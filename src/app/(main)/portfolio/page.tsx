import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Portfolio page",
};

export default function PortfolioPage() {

    return (
        <div className="container mx-auto text-center p-8">
            <h1 className=" text-3xl font-bold underline underline-offset-8">Portfolio page
            </h1>
            <p className="mt-4 text-lg">여기는 포폴 페이지입니다.</p>
        </div>
    );

};