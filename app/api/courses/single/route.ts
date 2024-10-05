import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const categoryId = req.nextUrl.searchParams.get('categoryId');

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/${categoryId}`);

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
        return NextResponse.json({ error: 'Courses Retreiving Failed' }, { status: 500 });
    }
}