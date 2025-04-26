// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User"; // your User model path

// POST - Create a new user
export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const newUser = await User.create(body);

        return NextResponse.json(
            { success: true, data: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { success: false, error: error },
            { status: 400 }
        );
    }
}

// GET - Retrieve all users
export async function GET() {
    await dbConnect();

    try {
        const users = await User.find({});
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
}
