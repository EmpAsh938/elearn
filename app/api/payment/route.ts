import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { userId, validDate, screenshotUrl, categoryIds } = body;


        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }
        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}user/${userId}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`
            },
            body: JSON.stringify({
                paymentDto: {
                    validDate,
                    payment_screensort: screenshotUrl
                },
                categoryIds
            })
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 201) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Payment Creation successful',
            status: 201,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Payment Creation failed', status: 500 });
    }
}