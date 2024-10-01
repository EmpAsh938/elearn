import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateRandomDiscounts() {
    const random = Math.random() * 100; // Random number between 0 and 99.99

    if (random < 50) {
        // 50% chance (0-49.99)
        return 5;
    } else if (random < 70) {
        // 20% chance (50-69.99)
        return 6;
    } else if (random < 80) {
        // 5% chance for 7% (70-74.99)
        return 7;
    } else if (random < 90) {
        // 5% chance for 8% (75-79.99)
        return 8;
    } else if (random < 95) {
        // 5% chance for 9% (80-84.99)
        return 9;
    } else {
        // 5% chance for 10% (85-100)
        return 10;
    }
}