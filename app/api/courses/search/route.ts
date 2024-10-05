import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams.get("query");

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/search/${query}`);

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }


        return NextResponse.json({
            message: 'Courses Retreived successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Courses Retreived Failed' }, { status: 500 });
    }
}