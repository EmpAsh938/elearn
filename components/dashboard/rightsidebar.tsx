"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const RightSidebar: React.FC = () => {
    const [date, setDate] = useState<Value>(new Date());
    // const [nepaliDate, setNepaliDate] = useState<string>(""); // For Nepali Date
    const [isNepaliCalendar, setIsNepaliCalendar] = useState(false);

    // Function to handle calendar toggle
    // const toggleCalendarFormat = () => {
    //     setIsNepaliCalendar(!isNepaliCalendar);
    // };

    const notices = [
        { id: 1, title: "New Course Available", date: "October 10, 2024" },
        { id: 2, title: "Live Class Today at 5PM", date: "October 9, 2024" },
        { id: 3, title: "Platform Maintenance", date: "October 8, 2024" },
        { id: 1, title: "New Course Available", date: "October 10, 2024" },
        { id: 2, title: "Live Class Today at 5PM", date: "October 9, 2024" },
        { id: 3, title: "Platform Maintenance", date: "October 8, 2024" },
        { id: 1, title: "New Course Available", date: "October 10, 2024" },
        { id: 2, title: "Live Class Today at 5PM", date: "October 9, 2024" },
        { id: 3, title: "Platform Maintenance", date: "October 8, 2024" },
    ];

    const currentYear = new Date().getFullYear();

    // Define the minimum and maximum dates within the current year
    const minDate = new Date(currentYear, 0, 1);  // January 1st of the current year
    const maxDate = new Date(currentYear, 11, 31); // December 31st of the current year


    return (
        <aside className="fixed top-16 right-0 h-screen w-64 bg-white border-l border-gray-200 p-4 hidden md:flex flex-col justify-between">
            {/* Calendar with Toggle Button */}
            <div className="mb-4">
                {/* <div className="flex justify-between items-center mb-2">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={toggleCalendarFormat}
                    >
                        {isNepaliCalendar ? "Switch to English Calendar" : "Switch to Nepali Calendar"}
                    </button>
                </div> */}
                {/* Render either English or Nepali calendar based on toggle */}
                {isNepaliCalendar ? (
                    <p>Nepali Calendar</p>
                ) : (
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="shadow-sm"
                        showNavigation={true} // Enable navigation buttons
                        minDate={minDate} // Set the minimum date to January 1st of the current year
                        maxDate={maxDate} // Set the maximum date to December 31st of the current year
                        calendarType="gregory"
                    />
                )}
            </div>

            {/* Notices and News */}
            {/* <div className="flex flex-col h-full">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Notices & News</h2>
                <div className="flex-1 overflow-y-auto">
                    <ul className="space-y-4">
                        {notices.map((notice, index) => (
                            <li key={index} className="p-2 border-b text-gray-600">
                                <h3 className="font-semibold text-sm">{notice.title}</h3>
                                <p className="text-xs text-gray-500">{notice.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> */}

        </aside>
    );
};

export default RightSidebar;
