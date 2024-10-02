import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/`, {
            method: "GET",
            headers: {
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`
            }
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }


        return NextResponse.json({
            message: 'Users Retreiving successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Users Retreiving Failed' }, { status: 500 });
    }
}