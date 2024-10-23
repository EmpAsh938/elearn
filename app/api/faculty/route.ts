import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { title, description, price, type, tag, courseValidDate } = body;

        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }

        // console.log(body)

        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`,
            },
            body: JSON.stringify({
                categoryTitle: title,
                categoryDescription: description,
                mainCategory: tag,
                categoryType: type,
                price: price || 1,
                courseValidDate
            }),

        });

        const data = await apiResponse.json();
        // console.log(data);
        // console.log(apiResponse);
        if (apiResponse.status !== 201) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Faculty Creation successful',
            status: 201,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Faculty Creation Failed failed' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { categoryId, title, description, price, categoryType, imageName, mainCategory, courseValidDate } = body;
        const sessionCookie = req.cookies.get('session')?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
        }


        // Make the request to your authentication API to get the token
        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Sandip ${sessionCookie}`,
            },
            body: JSON.stringify({
                categoryTitle: title,
                categoryDescription: description,
                price,
                mainCategory,
                categoryType,
                imageName,
                courseValidDate
            }),
        });

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error, status: apiResponse.status });
        }



        return NextResponse.json({
            message: 'Course Updated successfully',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Course Update Failed', status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/`);

        const data = await apiResponse.json();
        if (apiResponse.status !== 200) {
            return NextResponse.json({ error: data.error }, { status: apiResponse.status });
        }


        return NextResponse.json({
            message: 'Faculty Retreiving successful',
            status: 200,
            body: data,
        });


    } catch (error) {
        return NextResponse.json({ error: 'Faculty Retreiving Failed' }, { status: 500 });
    }
}