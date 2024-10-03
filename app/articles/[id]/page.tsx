// app/articles/[title]/page.js
import { use } from 'react'; // React hook to manage state
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from 'next/image';

const articles = [
    {
        title: "The Future of Education Technology",
        description: "An in-depth look at how technology is shaping the future of education.",
        image: "/images/notice.jpg", // Example image
        link: "/articles/future-of-edtech", // Example link
    },
    {
        title: "10 Tips to Excel in Online Learning",
        description: "Master the art of online learning with these essential tips.",
        image: "/images/notice.jpg", // Example image
        link: "/articles/tips-online-learning",
    },
    {
        title: "The Role of Mentorship in Education",
        description: "Why having a mentor can change your academic and professional journey.",
        image: "/images/notice.jpg", // Example image
        link: "/articles/role-of-mentorship",
    },
];


export default function Article({ params }: { params: { id: string } }) {
    const { id } = params; // Get the title from the URL
    const article = articles.find(pkg => pkg.link.includes(id));

    if (!article) {
        return <div>Package not found</div>;
    }

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="p-6 px-16">
                <h1 className="text-3xl font-bold mb-4 text-center">{article.title}</h1>
                <Image
                    src={article.image}
                    alt={article.title}
                    width={900}
                    height={900}
                    className="w-full h-60 object-cover rounded-md mb-4"
                />
                <p className="text-lg text-gray-600">{article.description}</p>
            </main>
            <Footer />
        </div>
    );
}
