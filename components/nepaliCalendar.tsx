import { Calender } from 'nepali-calendar-react';
import 'nepali-calendar-react/dist/index.css'


export function NepaliCalendar() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();

    const startDate = `${currentYear}/${currentMonth}/${currentDate}`;
    console.log(startDate)
    return (
        <Calender
            language='nepali'
            onDateClicked={(result: any) => console.log(result)}
            dayClickBehaviour='single'
            mode='monthly'
            startDate={startDate}
        />
    )
}