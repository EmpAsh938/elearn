import { createSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { username, password } = body;

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }

        // Set the session cookie with the token
        const token = data.token;
        const roles = data.user.roles.map((item: { name: string; }) => item.name);


        createSession(token, roles);
        // Use NextResponse to set the cookie
        return NextResponse.json({
            message: 'Login successful',
            status: 200,
            user: data.user,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
