import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/latest`, { cache: 'no-store' });

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