"use client";

import { createContext, useEffect, useState } from "react";

type AppContextType = {
    user: any;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const userFromStorage = JSON.parse(localStorage.getItem("user") || '{}');

        async function fetchPlan(userId: string) {
            try {
                const request = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });
                const response = await request.json();
                if (response.status !== 200) throw Error(response.error);

                setUser(response.user);
                localStorage.setItem("user", JSON.stringify(response.user));
            } catch (error: any) {
                console.error('Error fetching plan:', error);
            }
        }

        if (userFromStorage?.id) { // Check if userId exists
            fetchPlan(userFromStorage.id);
        } else {
            setUser({});
        }
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <AppContext.Provider value={{
            user
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
