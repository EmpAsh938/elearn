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