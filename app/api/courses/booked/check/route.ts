import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const categoryId = req.nextUrl.searchParams.get("categoryId");
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}check/user/${userId}/category/${categoryId}`);

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: data ? 'Course has been booked' : 'Course has not been booked or some error occured',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Some error occured', status: 500 });
    }
}