import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { email, role } = body;


        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/addRole/email/${email}/role/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            },
            body: JSON.stringify({ email, role }),
        });

        const data = await apiResponse.json();
        console.log(data)
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Role updated successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Role update failed' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {


        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            },
        });

        const data = await apiResponse.json();
        console.log(data)
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Role listing successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Role listing failed' }, { status: 500 });
    }
}
