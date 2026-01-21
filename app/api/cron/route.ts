import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

async function keepAlive() {
    const supabase = createSupabaseClient();

    // Perform a lightweight query to check database connection
    return await supabase
        .from('companions')
        .select('*', { count: 'exact', head: true });
}

async function handleRequest() {
    try {
        const { count, error } = await keepAlive();

        if (error) {
            console.error("Supabase keep-alive query failed:", error);
            // Even on error, return 200 to uptime robot to stop it from yelling
            // But log the error internally
            // Actually, better to return 500 if DB is down so we know? 
            // The user wants to keep DB alive. If query fails, DB might be down.
            // But for 405 fix, we just need to respond.
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { message: "Cron job executed successfully", count },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }
        );
    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    return handleRequest();
}

export async function HEAD() {
    const response = await handleRequest();
    return new NextResponse(null, {
        status: response.status,
        headers: response.headers,
    });
}

// OPTIONS handler
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

// Catch-all for other methods to prevent 405
export async function POST() { return handleRequest(); }
export async function PUT() { return handleRequest(); }
export async function DELETE() { return handleRequest(); }
export async function PATCH() { return handleRequest(); }
