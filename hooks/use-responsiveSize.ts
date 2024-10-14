"use client";

import { useState, useEffect } from 'react';

const useResponsiveSize = () => {
    const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Ensure this runs only on the client
        setIsClient(true);
    }, []);

    const updateSize = () => {
        if (window.innerWidth < 640) {
            // Small screen (mobile)
            setImageSize({ width: 200, height: 200 });
        } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
            // Medium screen (tablet)
            setImageSize({ width: 300, height: 300 });
        } else {
            // Large screen (desktop)
            setImageSize({ width: 400, height: 400 });
        }
    };

    useEffect(() => {
        if (isClient) {
            // Initial size update
            updateSize();

            // Update size on window resize
            window.addEventListener('resize', updateSize);

            return () => window.removeEventListener('resize', updateSize);
        }
    }, [isClient]);

    return imageSize;
};

export default useResponsiveSize;
