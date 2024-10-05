import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userId}`);

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }


        return NextResponse.json({
            message: 'User Retreiving successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'User Retreiving Failed' }, { status: 500 });
    }
}