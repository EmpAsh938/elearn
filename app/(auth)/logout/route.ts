import { deleteSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {





        deleteSession();
        return NextResponse.json({
            message: 'Logout successful',
            status: 200,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
}
