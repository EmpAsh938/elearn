import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, faculty } = body;

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userId}/faculty`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            },
            body: JSON.stringify({ faculty }),
        });


        const data = await apiResponse.json();

        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Faculty updated successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Faculty update failed' }, { status: 500 });
    }
}
