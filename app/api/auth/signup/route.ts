import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { name, email, faculty, otp, collegename, password } = body;

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, faculty, otp, collegename, password }),
        });

        const data = await apiResponse.json();
        console.log(data);
        if (apiResponse.status !== 201) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }


        return NextResponse.json({
            message: 'Registration successful',
            status: 201,
            user: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}