import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}exams`);

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Exam Listing successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Exam Listing failed', status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { userId, categoryId, title, deadline } = body;


        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }
        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}user/${userId}/category/${categoryId}/exams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`
            },
            body: JSON.stringify({ title, deadline })
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 201) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Exam Creation successful',
            status: 201,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Exam Creation failed', status: 500 });
    }
}
export async function PUT(req: NextRequest) {
    try {

        const body = await req.json();
        const { examId, title, deadline } = body;


        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }
        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}exams/${examId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`
            },
            body: JSON.stringify({ title, deadline })
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Exam update successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Exam updated failed', status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {

        const examId = req.nextUrl.searchParams.get('examId');

        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }


        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}exams/${examId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Sandip ${sessionCookie}`,
            },
        });

        const data = await apiResponse.json();

        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Exam Deleted successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Exam Delete Failed', status: 500 });
    }
}


// /exam/file/upload/examId 

// /exam/file/filename
