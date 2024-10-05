import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, discount } = body;

        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }

        console.log(sessionCookie)

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userId}/discount`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`,
            },
            body: JSON.stringify({ discount }),
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Discount Applied Successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Discount Setting Failed' }, { status: 500 });
    }
}