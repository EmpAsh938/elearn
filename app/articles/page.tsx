import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link"; // Assuming you'll link to full articles

export default function Articles() {
    const articles = [
        {
            title: "The Future of Education Technology",
            description: "An in-depth look at how technology is shaping the future of education.",
            image: "/images/notice.png", // Example image
            link: "/articles/future-of-edtech", // Example link
        },
    ];

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="border-t border-gray-300 p-6 px-16">
                <h1 className="text-3xl font-bold mb-8 text-center">Articles & Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                            <Image
                                src={article.image}
                                alt={article.title}
                                height={900}
                                width={900}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-gray-500 mb-4">{article.description.slice(0, 40) + "..."}</p>
                            <Link href={article.link}>
                                <span className="text-blue-500 font-medium">Read more</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
