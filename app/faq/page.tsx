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
        question: "What is Utkrista Shikshya?",
        answer: "Utkrista Shikshya is a pioneering e-learning platform that seamlessly blends education with technology, providing an innovative space where dreams meet knowledge and learning opportunities."
    },
    {
        question: "How do I create an account?",
        answer: "Creating an account on Utkrista Shikshya is easy! Just follow these steps: Visit the Sign Up page, enter your details in the form, click 'Register,' and you’ll receive an OTP on your phone. Enter it to verify, set your password, and you’re ready to start your learning journey!"
    },
    {
        question: "What types of courses are available?",
        answer: "Utkrista Shikshya offers a diverse range of courses, including academic subjects, skill development, personal growth, and language proficiency classes, catering to various interests and learning goals."
    },
    {
        question: "Are the courses free?",
        answer: "Some courses are available free of charge. You can find these offerings listed in the 'Free Courses' section of the platform."
    },
    {
        question: "Is there a mobile app for Utkrista Shikshya?",
        answer: "We don’t have a mobile app yet, but we’re working hard to launch one soon. Stay tuned!"
    },
    {
        question: "What are the offers during Dashain and Tihar?",
        answer: "During Dashain and Tihar, we’re excited to offer a Spin Wheel! Check your luck, and the percentage you land on will be your discount on your first course purchase. This offer runs from Fulpati to the last day of Kartik."
    }
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
