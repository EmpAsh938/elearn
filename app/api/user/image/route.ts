import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body as FormData
        const formData = await req.formData();

        const userId = formData.get("userId"); // Extract userId from the form data
        const file = formData.get("file"); // Extract the uploaded file

        if (!file || !userId) {
            return NextResponse.json({ error: 'File or User ID missing' }, { status: 400 });
        }

        // Now, handle the file upload by making a PUT request to your API
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/file/upload/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Sandip ${req.cookies.get('session')?.value}`
            },
            body: formData // Pass the FormData directly
        });

        const data = await apiResponse.json();

        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }

        return NextResponse.json({
            message: 'File uploaded successfully',
            status: 200,
            body: data,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
    }
}
