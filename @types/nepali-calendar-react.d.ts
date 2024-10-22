declare module 'nepali-calendar-react' {
    interface CalenderProps {
        language: 'english' | 'nepali';
        onDateClicked: (result: any) => void;
        dayClickBehaviour: 'single' | 'multiple';
        mode: 'monthly' | 'yearly';
        startDate?: string;
    }

    const Calender: React.FC<CalenderProps>;
    export { Calender };
}
