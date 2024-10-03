"use client";

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { useState } from 'react';

// Define the type for a single FAQ item
interface FaqItemType {
    question: string;
    answer: string;
}

// Define the type for the props of the FaqItem component
interface FaqItemProps {
    faq: FaqItemType;
    index: number;
    toggleFaq: (index: number) => void;
    isOpen: boolean;
}

// Define the FAQ data with types
const faqData: FaqItemType[] = [
    {
        question: "What is Utrkistra Shiksa?",
        answer: "Utrkistra Shiksa is an innovative e-learning platform that offers a variety of courses and resources to help learners of all ages improve their skills and knowledge in various subjects."
    },
    {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button on the homepage. Fill in your details, verify your email, and you'll be ready to start learning!"
    },
    {
        question: "What types of courses are available?",
        answer: "Utrkistra Shiksa offers courses in various categories, including technology, arts, business, and personal development. You can browse our course catalog for more details."
    },
    {
        question: "Are the courses free?",
        answer: "We offer both free and paid courses. Free courses can be accessed without payment, while paid courses provide additional content and resources."
    },
    {
        question: "How can I access my purchased courses?",
        answer: "Once you've purchased a course, it will be available in your account dashboard under the 'My Courses' section. You can access it anytime."
    },
    {
        question: "What if I have questions about a course?",
        answer: "You can reach out to the course instructor through the platform's messaging system, or check the course's discussion forum for assistance from fellow learners."
    },
    {
        question: "How do I track my progress?",
        answer: "You can track your progress through your account dashboard, where you'll see completed lessons, scores on quizzes, and overall progress in each course."
    },
    {
        question: "Is there a mobile app for Utrkistra Shiksa?",
        answer: "Not, we do not offer a mobile app for both iOS and Android devices, allowing you to learn on the go. So, You cannot download it from the respective app stores."
    },
    // Add more FAQ items here as needed
];

const FaqItem: React.FC<FaqItemProps> = ({ faq, index, toggleFaq, isOpen }) => (
    <div className="border-b-2 border-gray-200 py-4">
        <button
            className="flex justify-between w-full text-left text-lg font-semibold text-gray-800 focus:outline-none"
            onClick={() => toggleFaq(index)}
        >
            {faq.question}
            <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                {isOpen ? '-' : '+'}
            </span>
        </button>
        {isOpen && <p className="mt-2 text-gray-600">{faq.answer}</p>}
    </div>
);

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 md:px-0  pb-10">
                <div className="flex flex-col text-center gap-2 mb-6">
                    <h2 className="text-2xl md:text-4xl font-semibold ">FAQ</h2>
                    <p className="text-gray-500">You can resolve your doubts and queries from here. Feel free to reach our <Link href="/contact" className="text-darkNavy font-semibold">contact page</Link> for more information.</p>
                </div>
                {faqData.map((faq, index) => (
                    <FaqItem
                        key={index}
                        faq={faq}
                        index={index}
                        isOpen={index === openIndex}
                        toggleFaq={toggleFaq}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Faq;
