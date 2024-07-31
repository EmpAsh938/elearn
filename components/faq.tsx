import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faq() {
    const faqs = [
        {
            question: "How do I join a live class?",
            answer: "To join a live class, click on the 'Join Live Class' button on the homepage or navigate to the 'Live Classes' section from the menu. Select the class you want to join and click 'Join Now'."
        },
        {
            question: "How can I view my assignments?",
            answer: "You can view your assignments by clicking on the 'View Exams' button on the homepage or by going to the 'Assignments' section from the menu. Here, you'll find all your pending and completed assignments."
        },
        {
            question: "Where can I find the study materials?",
            answer: "Study materials can be found in the 'Materials' section. You can access it from the menu. All uploaded study materials, including lecture notes and recorded videos, are available here."
        },
        {
            question: "How do I upload my assignment?",
            answer: "To upload your assignment, navigate to the 'Assignments' section, select the assignment you want to submit, and click the 'Upload' button. You can then choose your file and submit it."
        },
        {
            question: "How do I contact support?",
            answer: "If you need assistance, you can contact support by clicking on the 'Contact Us' link at the bottom of the page. Fill out the contact form, and our support team will get back to you as soon as possible."
        },
        {
            question: "Can I download study materials?",
            answer: "Yes, you can download study materials. Navigate to the 'Materials' section, select the material you want to download, and click the 'Download' button."
        },
        {
            question: "How do I update my profile information?",
            answer: "To update your profile information, go to the 'Profile' section from the menu. Here, you can edit your personal details, change your password, and update your contact information."
        },
        {
            question: "What should I do if I forget my password?",
            answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password. You'll receive an email with a link to create a new password."
        }
    ];

    return (

        <Accordion type="single" collapsible className="max-w-lg mx-auto">
            {faqs.map((faq, index) => {

                return <AccordionItem key={index} value={faq.question}>
                    <AccordionTrigger className="text-lg px-2">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            })}
        </Accordion>
    )
}