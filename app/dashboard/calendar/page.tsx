"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css'; // Ensure custom CSS for styling
import { NepaliCalendar } from "@/components/nepaliCalendar";
import { Button } from "@/components/ui/button";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPage() {
    const [date, setDate] = useState<Value>(new Date());
    const [isNepaliCalendar, setIsNepaliCalendar] = useState(true);

    const currentYear = new Date().getFullYear();

    // Define the minimum and maximum dates within the current year
    const minDate = new Date(currentYear, 0, 1);  // January 1st of the current year
    const maxDate = new Date(currentYear, 11, 31); // December 31st of the current year

    // Custom navigation label to disable month and year selection (static text only)
    const navigationLabel = ({ date }: { date: Date }): string => {
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };

    // Function to apply custom classes to tiles
    const tileClassName = ({ date }: { date: Date }): string | undefined => {
        // Check if the day is Saturday (day index 6)
        return date.getDay() === 6 ? 'saturday' : 'non-saturday';
    };

    return (
        <div className="md:ml-52 mt-16 p-6">
            <section>
                <Button className="mb-4 bg-orange-500 hover:bg-orange-600" onClick={() => setIsNepaliCalendar(!isNepaliCalendar)}>
                    {`Toggle Calendar - ${isNepaliCalendar ? 'NEP' : 'EN'}`}
                </Button>

                {isNepaliCalendar ? (
                    <NepaliCalendar />
                    // <p></p>
                ) : (
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="shadow-sm no-select" // Add custom class to disable clicks
                        showNavigation={true} // Enable navigation buttons
                        minDate={minDate} // Set the minimum date to January 1st of the current year
                        maxDate={maxDate} // Set the maximum date to December 31st of the current year
                        calendarType="hebrew"
                        showNeighboringMonth={false} // Hide neighboring month dates
                        navigationLabel={navigationLabel} // Disable dropdown, custom label
                        nextLabel="›" // Customize next button
                        prevLabel="‹" // Customize prev button
                        tileClassName={tileClassName} // Apply custom classes to tiles
                    />
                )}
            </section>
        </div>
    );
}
