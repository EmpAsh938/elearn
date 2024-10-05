import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import { generateRandomDiscounts } from '@/app/lib/utils';  // Import the discount generation function
import { toast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';

// Data for the wheel segments
const data = [
    { option: '5%', style: { backgroundColor: '#f9d423', textColor: '#000000' } },  // Bright Yellow
    { option: '6%', style: { backgroundColor: '#ff6f61', textColor: '#ffffff' } },    // Coral Red
    { option: '7%', style: { backgroundColor: '#5c3d99', textColor: '#ffffff' } },    // Purple
    { option: '8%', style: { backgroundColor: '#3498db', textColor: '#ffffff' } },    // Light Blue
    { option: '9%', style: { backgroundColor: '#e67e22', textColor: '#ffffff' } },    // Orange
    { option: '10%', style: { backgroundColor: '#2ecc71', textColor: '#ffffff' } },   // Green
];


// Dynamically import the Wheel component from 'react-custom-roulette'
const DynamicWheel = dynamic(() => import('react-custom-roulette').then(mod => mod.Wheel), { ssr: false });

export default function WheelSpin() {
    const [mustSpin, setMustSpin] = useState(false);  // To trigger the wheel spin
    const [prizeNumber, setPrizeNumber] = useState(0);  // To store the selected discount index
    const [spinResult, setSpinResult] = useState<string | null>(null);  // Store the final result

    // Function to handle the spinning logic
    const handleSpinClick = () => {
        // Generate the random discount percentage
        const randomDiscount = generateRandomDiscounts();

        // Map the randomDiscount to the corresponding index in the `data` array
        const discountIndex = data.findIndex(item => item.option === `${randomDiscount}%`);

        // Set the prize number (index) to where the wheel will stop
        setPrizeNumber(discountIndex);

        // Trigger the wheel spin
        setMustSpin(true);
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

            if (response.status !== 200) {
                throw new Error(result.error || 'Failed to send the discount to the server');
            }

            toast({ description: 'You have received discount of ' + discount });

            // Delay for 2 seconds to give time for the user to see the success message
            await new Promise((resolve) => setTimeout(resolve, 2000));

            window.location.href = "/dashboard";
        } catch (error: any) {
            toast({ variant: 'destructive', description: error.message || 'Error sending discount to the server' });
            console.error('Error sending discount to the server:', error);
        }
    };

    return (
        <div className="fixed bottom-[80px] left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center parent-container">
            {/* Display the Discount Spin Wheel */}
            <DynamicWheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                backgroundColors={['#3e3e3e', '#df3428']}
                textColors={['#ffffff']}
                outerBorderWidth={0}
                radiusLineWidth={1}
                radiusLineColor='white'
                onStopSpinning={handleStopSpin}  // Call when the wheel stops spinning
            />

            {/* Spin Button */}
            <button
                className="mt-4 px-4 py-2 text-white bg-blue rounded"
                onClick={handleSpinClick}
                disabled={mustSpin || spinResult !== null}  // Disable while the wheel is spinning
            >
                {mustSpin ? 'Spinning...' : 'Spin for Discount'}
            </button>

            {/* Display the Result */}
            {spinResult && (
                <div className="mt-4 text-lg font-bold text-green">
                    Congratulations! You won: {spinResult} discount!
                </div>
            )}
        </div>
    );
}
