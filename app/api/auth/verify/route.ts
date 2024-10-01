import { updateRole } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { userId } = body;

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userId}`);

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }

        // Set the session cookie with the token

        const roles = data.roles.map((item: { name: string; }) => item.name);

        // console.log(data.user)
        // save user details in localstorage
        // localStorage.setItem("user", JSON.stringify(data.user));
        updateRole(roles);
        // Use NextResponse to set the cookie
        return NextResponse.json({
            message: 'Login successful',
            status: 200,
            user: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
