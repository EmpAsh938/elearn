import { generateRandomDiscounts } from '@/app/lib/utils';
import { useState } from 'react';

export default function SpinWheel() {
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [spinResult, setSpinResult] = useState<number | null>(null);
    const [rotation, setRotation] = useState<number>(0); // Track the current rotation

    // Discount options for the wheel
    const wheelItems = [5, 6, 7, 8, 9, 10];

    const handleSpin = () => {
        if (!isSpinning) {
            setIsSpinning(true);

            // Get a random discount
            const discount = generateRandomDiscounts();

            // Determine the corresponding segment on the wheel
            const segmentIndex = wheelItems.indexOf(discount);

            // Each segment is 60 degrees wide
            const segmentDegree = 360 / wheelItems.length;

            // Calculate the degree the wheel should rotate to land on the selected discount
            const targetDegree = segmentIndex * segmentDegree;

            // Add extra full rotations for visual effect (1800 = 5 full rotations)
            const totalRotation = targetDegree + 1800;

            // Rotate the wheel
            const wheel = document.getElementById('wheel');
            if (wheel) {
                wheel.style.transition = 'transform 4s ease-out';
                wheel.style.transform = `rotate(${totalRotation}deg)`;
            }

            // Set the spin result and rotation after the animation
            setTimeout(() => {
                setIsSpinning(false);
                setSpinResult(discount); // Set the result after the spin
                setRotation(totalRotation % 360); // Store the final rotation value
            }, 4000); // Animation duration of 4 seconds
        }
    };

    const highlightedSegment = Math.floor(rotation / (360 / wheelItems.length)); // Find the winning segment

    return (
        <div className="fixed bottom-4 right-8 z-50 flex flex-col items-center">
            {/* Arrow indicator */}
            {/* <div className="relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-red"></div>
            </div> */}

            {/* Spin Wheel */}
            <div className="relative w-32 h-32 border-4 border-gray-800 rounded-full">
                <div
                    id="wheel"
                    className="absolute inset-0 flex items-center justify-center w-full h-full rounded-full"
                    style={{
                        background: `conic-gradient(
                          ${highlightedSegment === 0 ? '#f9d423' : '#f9d423'} 0 60deg,
                          ${highlightedSegment === 1 ? '#f83600' : '#f83600'} 60deg 120deg,
                          ${highlightedSegment === 2 ? '#bd3f32' : '#bd3f32'} 120deg 180deg,
                          ${highlightedSegment === 3 ? '#ff4e50' : '#ff4e50'} 180deg 240deg,
                          ${highlightedSegment === 4 ? '#00b09b' : '#00b09b'} 240deg 300deg,
                          ${highlightedSegment === 5 ? '#96c93d' : '#96c93d'} 300deg 360deg
                        )`,
                    }}
                >
                    {/* Adding numbers to the wheel */}
                    {wheelItems.map((item, index) => {
                        const angle = (360 / wheelItems.length) * index; // Calculate angle for each item
                        const translateX = 65; // Distance from the center to the text
                        const translateY = -15; // Adjust for vertical positioning

                        return (
                            <div
                                key={item}
                                className="absolute text-darkNavy font-bold text-md"
                                style={{
                                    transform: `rotate(${angle}deg) translate(${translateX}px, ${translateY}px)`,
                                    transformOrigin: '0 0', // Rotate around the center of the wheel
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    textAlign: 'center', // Center text alignment
                                }}
                            >
                                {item}%
                            </div>
                        );
                    })}

                    <div className="text-white font-bold text-md">Spin!</div>
                </div>
            </div>

            {/* Spin button */}
            <button
                className={`mt-2 px-4 py-2 text-white rounded ${isSpinning ? 'bg-gray-400' : 'bg-blue'}`}
                disabled={isSpinning}
                onClick={handleSpin}
            >
                {isSpinning ? 'Spinning...' : 'Spin'}
            </button>

            {/* Display the spin result */}
            {spinResult !== null && (
                <div className="mt-2 text-sm font-bold text-green">
                    You won: {spinResult}% discount!
                </div>
            )}
        </div>
    );
}
