import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const categoryId = req.nextUrl.searchParams.get('categoryId');

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}exam/${categoryId}`, {
            method: 'GET',
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Answer Listing successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Answer Listing failed', status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { userId, examId, content } = body;

        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}user/${userId}/exam/${examId}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`,
            },
            body: JSON.stringify({ content })
        });

        const data = await apiResponse.json();

        if (apiResponse.status !== 201) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Answer Creation successful',
            status: 201,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Answer Creation failed', status: 500 });
    }
}