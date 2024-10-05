import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import { generateRandomDiscounts } from '@/app/lib/utils';  // Import the discount generation function
import { toast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';

// Data for the wheel segments
const data = [
    { option: '5%', style: { backgroundColor: '#f9d423', textColor: '#000000' } },
    { option: '6%', style: { backgroundColor: '#f83600', textColor: '#ffffff' } },
    { option: '7%', style: { backgroundColor: '#bd3f32', textColor: '#ffffff' } },
    { option: '8%', style: { backgroundColor: '#ff4e50', textColor: '#ffffff' } },
    { option: '9%', style: { backgroundColor: '#00b09b', textColor: '#ffffff' } },
    { option: '10%', style: { backgroundColor: '#96c93d', textColor: '#ffffff' } },
];

// Dynamically import the Wheel component from 'react-custom-roulette'
const DynamicWheel = dynamic(() => import('react-custom-roulette').then(mod => mod.Wheel), { ssr: false });

export default function WheelSpin() {
    const [mustSpin, setMustSpin] = useState(false);  // To trigger the wheel spin
    const [prizeNumber, setPrizeNumber] = useState(0);  // To store the selected discount index
    const [spinResult, setSpinResult] = useState<string | null>(null);  // Store the final result

    // Function to handle the spinning logic
    const handleSpinClick = () => {

        window.location.href = "/signup";
        return;


    };

    // Function to handle when the spin stops
    const handleStopSpin = () => {
        setMustSpin(false);  // Stop the spinning
        setSpinResult(data[prizeNumber].option);  // Set the result based on the prize number
        sendDiscountToServer(data[prizeNumber].option);
    };

    const sendDiscountToServer = async (discount: string) => {
        try {

            const user = JSON.parse(localStorage.getItem('user') || '{}');

            if (!user || !user.id) throw new Error('User not found');

            const response = await fetch('/api/discount', {
                method: 'PUT',
                body: JSON.stringify({ userId: user.id, discount }), // Send the discount in the body
            });

            const result = await response.json();

            if (result.status !== 200) {
                throw new Error(result.error || 'Failed to send the discount to the server');
            }

            toast({ description: 'Discount saved successfully!' });
            window.location.href = "/dashboard";
        } catch (error: any) {
            toast({ variant: 'destructive', description: error.message || 'Error sending discount to the server' });
            console.error('Error sending discount to the server:', error);
        }
    };

    return (
        <div className="fixed bottom-[80px] left-4 z-50 flex flex-col items-center parent-container">
            {/* Display the Discount Spin Wheel */}
            <DynamicWheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                backgroundColors={['#3e3e3e', '#df3428']}
                textColors={['#ffffff']}
                onStopSpinning={handleStopSpin}  // Call when the wheel stops spinning
            />

            {/* Spin Button */}
            <button
                className="mt-4 px-4 py-2 text-white bg-blue rounded"
                onClick={handleSpinClick}
                disabled={mustSpin}  // Disable while the wheel is spinning
            >
                {mustSpin ? 'Spinning...' : 'Spin'}
            </button>

            {/* Display the Result */}
            {spinResult && (
                <div className="mt-4 text-lg font-bold text-green">
                    You won: {spinResult} discount!
                </div>
            )}
        </div>
    );
}
