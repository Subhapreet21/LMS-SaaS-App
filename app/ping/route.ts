import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

// NEW ROUTE: /ping (Root level)
// Moved out of /api to completely bypass Clerk Middleware

async function keepAlive() {
    try {
        const supabase = createSupabaseClient();

        // Perform a lightweight query to check database connection
        return await supabase
            .from('companions')
            .select('*', { count: 'exact', head: true });
    } catch (err) {
        console.error("Supabase client init error:", err);
        return { count: null, error: { message: "Supabase init failed" } };
    }
}

async function handleRequest() {
    try {
        const { count, error } = await keepAlive();

        if (error) {
            console.error("Supabase keep-alive query failed:", error);
            // Return 200 even on DB error to keep Uptime Robot happy
            return NextResponse.json(
                { message: "Ping received (DB Error)", error: error.message },
                { status: 200, headers: commonHeaders }
            );
        }

        return NextResponse.json(
            { message: "Pong! Database is active.", count },
            { status: 200, headers: commonHeaders }
        );
    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 200, headers: commonHeaders }
        );
    }
}

// Aggressive cache busting headers
const commonHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
};

export async function GET() { return handleRequest(); }
export async function HEAD() {
    const response = await handleRequest();
    return new NextResponse(null, { status: response.status, headers: response.headers });
}
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Allow': 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS',
        },
    });
}
export async function POST() { return handleRequest(); }
export async function PUT() { return handleRequest(); }
export async function DELETE() { return handleRequest(); }
export async function PATCH() { return handleRequest(); }
