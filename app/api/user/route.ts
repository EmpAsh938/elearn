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


export async function PUT(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId, collegename, name, email } = body;

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            },
            body: JSON.stringify({ collegename, name, email }),
        });


        const data = await apiResponse.json();

        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'User updated successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'User update failed' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        console.log(userId)
        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`

            },
        });

        const data = await apiResponse.json();
        console.log(data)
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'User deleted successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'User deletion failed', status: 500 });
    }
}
