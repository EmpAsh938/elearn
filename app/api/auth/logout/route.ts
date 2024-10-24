import { deleteSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Parse the request body
        // const body = await req.json();
        // const formData = new FormData();
        // Object.keys(body).forEach(key => formData.append(key, body[key]));

        // const data = await submitMessage(formData);
        // const data = '';

        // Return the parsed body as JSON response
        deleteSession();
        return NextResponse.json({ message: "Logged out successfully", status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}