import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}lives/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            }
        });

        const data = await apiResponse.json();
        console.log(data)
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Course Listing successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Course Listing failed' }, { status: 500 });
    }
}