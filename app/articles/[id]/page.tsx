import { articles } from "@/app/lib/blog";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from 'next/image';


export default function Article({ params }: { params: { id: string } }) {
    const { id } = params; // Get the title from the URL
    const article = articles.find(article => article.link.includes(id));

    if (!article) {
        return <div>Article not found</div>;
    }
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="border-t border-gray-300 p-6 px-4 md:px-16">
                <h1 className="text-3xl font-medium mb-4 text-center">{article.title}</h1>
                <Image
                    src={article.image}
                    alt={article.title}
                    width={900}
                    height={900}
                    className="w-full max-w-[800px] mx-auto object-cover rounded-md mb-8"
                />
                {/* Loop through article sections */}
                <div className="w-full max-w-[800px] mx-auto text-lg text-darkNavy">
                    {article.sections.map((section, index) => (
                        <div key={index} className="mb-6 tracking-wider">
                            <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
                            <p className="text-sm text-justify">{section.paragraph}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
