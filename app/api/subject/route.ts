import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, categoryId, title, content, videoLink } = body;


        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}user/${userId}/category/${categoryId}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            },
            body: JSON.stringify({ title, content, videoLink }),
        });

        const data = await apiResponse.json();
        console.log(data)
        if (apiResponse.status !== 201) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Course Creation successful',
            status: 201,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Course Creation failed' }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            }
        });

        const data = await apiResponse.json();
        console.log(data)
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
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