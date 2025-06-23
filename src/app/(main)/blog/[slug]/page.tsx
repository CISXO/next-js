
// /app/blog/[slug]/page.back.tsx
// => /blog/:prameter와 같음

export default function BlogDetailPage() {
    return (
        <div>
            <h1 className="text-4xl font-bold">BlogDetailPage</h1>
        </div>
    )
}

export function generateStaticParams() {
    return [
        {
        slug: "1",
        },
    ];
}