import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}booked/user/${userId}`);

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
        return NextResponse.json({ error: 'Booked sCourses Retreived Failed', status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, categoryId } = body;

        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }


        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}user/${userId}/category/${categoryId}/bookeds/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`,
            }, body: JSON.stringify({})
        });

        const data = await apiResponse.json();
        console.log(data);
        if (apiResponse.status !== 201) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Course Booked Successfully',
            status: 201,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Course Booked Failed', status: 500 });
    }
}