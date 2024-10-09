import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Check if the request has a file
        const formData = await req.formData();
        const categoryId = formData.get("categoryId");
        const file = formData.get("file"); // Assuming the file input field is named 'file'

        if (!categoryId || !file) {
            return NextResponse.json({ error: 'Category ID and file are required', status: 400 });
        }

        // Create a FormData object to send the file
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("categoryId", categoryId);

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/file/upload/${categoryId}`, {
            method: 'POST',
            body: uploadData,
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }

        return NextResponse.json({
            message: 'File uploaded successfully',
            status: 200,
            body: data,
        });

    } catch (error) {
        return NextResponse.json({ error: 'File could not be uploaded', status: 500 });
    }
}