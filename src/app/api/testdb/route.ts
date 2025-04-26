// src/app/api/testconnection/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";

export async function GET() {
    try {
        // Connect to the database
        await dbConnect();

        // If no error was thrown, connection is successful
        return NextResponse.json({
            success: true,
            message: "Successfully connected to MongoDB!",
        });
    } catch (error) {
        console.error("Connection error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to connect to MongoDB",
            },
            { status: 500 }
        );
    }
}
