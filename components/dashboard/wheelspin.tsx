import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import { generateRandomDiscounts } from '@/app/lib/utils';  // Import the discount generation function
import { toast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

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
    const [open, setOpen] = useState(false);  // Control modal visibility


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
        setOpen(true);
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

            // toast({ description: 'You have received discount of ' + discount });

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
            <Button
                className="mt-4 px-4 py-2 text-white bg-blue rounded"
                onClick={handleSpinClick}
                disabled={mustSpin || spinResult !== null}
            // Disable while the wheel is spinning
            >
                {mustSpin ? 'Spinning...' : 'Spin for Discount'}
            </Button>


            {/* Modal to display the result */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white p-8 rounded-lg shadow-lg transition-transform transform duration-300">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-center text-gray-800">
                            🎉 You’ve Hit the Jackpot!
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center mt-4">
                        <span className="text-6xl font-extrabold text-green-500">{spinResult}</span>
                    </div>
                    <p className="mt-4 text-center text-lg text-gray-600">
                        Awesome! You’ve just unlocked a special <span className="font-bold">{spinResult}</span> discount on your next purchase. Get ready to save big!
                    </p>
                    <p className="mt-2 text-center text-gray-500">
                        Don’t wait, your discount is waiting for you in your cart. Happy purchasing course! 🛒
                    </p>
                    <div className="flex justify-center mt-6">
                        <Button className="bg-blue text-white hover:bg-blue transition-colors" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}
