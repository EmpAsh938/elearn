import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}bookeds`, {
            method: "GET",
            headers: {
                'Authorization': `Sandip ${sessionCookie}`,
            },
        });

        const data = await apiResponse.json();

        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }

        return NextResponse.json({
            message: 'Booked Courses Retreived successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Booked Courses Retreived Failed', status: 500 });
    }
}