import { NextResponse } from "next/server";

// TEMPORARY DEBUG: Commented out Supabase to isolate connectivity issues
// import { createSupabaseClient } from "@/lib/supabase";

async function keepAlive() {
    // const supabase = createSupabaseClient();
    // return await supabase
    //   .from('companions')
    //   .select('*', { count: 'exact', head: true });

    // Simulate instant success
    return { count: 1, error: null };
}

async function handleRequest() {
    console.log("Cron request received");
    return NextResponse.json(
        { message: "Cron job executed successfully - DEBUG MODE" },
        {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        }
    );
}

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
