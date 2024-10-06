import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from 'next/image';

// Updated structure of articles with section-based content
const articles = [
    {
        title: "The Future of Education Technology",
        image: "/images/notice.png", // Example image
        sections: [
            {
                heading: "Merging Education with Technology: A New Era of Learning",
                paragraph: "In today’s world, blending education with technology is changing how we learn. From online classes to fun learning tools, technology is making education easier and more exciting."
            },
            {
                heading: "The Shift to Online Learning",
                paragraph: "Education is no longer just about sitting in a classroom. With online learning platforms, students can take courses from anywhere. This flexibility allows busy people to study when it suits them. Professionals can now learn new skills at their own pace, making education more available to everyone."
            },
            {
                heading: "Fun and Interactive Content",
                paragraph: "One of the best things about using technology in education is how engaging it can be. Digital resources like videos, quizzes, and games make learning enjoyable. For example, virtual reality can let students explore places or ideas in a way that feels real, making tough topics easier to understand."
            },
            {
                heading: "Personalized Learning",
                paragraph: "Technology also allows for personalized learning. Smart systems can track how students are doing and adjust lessons to fit their needs. This means everyone can learn at their own speed, focusing on what they find challenging while moving quickly through familiar material."
            },
            {
                heading: "Closing the Gap",
                paragraph: "While the benefits are clear, there are still challenges. Not everyone has access to devices or fast internet, which can create gaps in learning. However, many organizations are working to make sure that everyone can benefit from technology in education."
            },
            {
                heading: "The Future of Learning",
                paragraph: "Looking ahead, the possibilities for technology in education are huge. From using AI for feedback to secure online certificates, the future holds exciting changes."
            },
            {
                heading: "Conclusion",
                paragraph: "In conclusion, merging education with technology is more than just a trend; it’s a new way of learning. It empowers students, encourages creativity, and creates a more inclusive environment. As we continue to explore this exciting relationship, we can look forward to a future where everyone has the chance to learn and succeed."
            },
        ],
        link: "/articles/future-of-edtech",
    },
    // Add other articles with the same structure
];

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
                <h1 className="text-3xl font-bold mb-4 text-center">{article.title}</h1>
                <Image
                    src={article.image}
                    alt={article.title}
                    width={900}
                    height={900}
                    className="w-full max-w-[600px] mx-auto object-cover rounded-md mb-4"
                />
                {/* Loop through article sections */}
                <div className="w-full max-w-[600px] mx-auto text-lg text-gray-600">
                    {article.sections.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
                            <p className="text-justify">{section.paragraph}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
