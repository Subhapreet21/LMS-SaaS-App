import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

async function keepAlive() {
    const supabase = createSupabaseClient();

    // Perform a lightweight query to check database connection
    return await supabase
        .from('companions')
        .select('*', { count: 'exact', head: true });
}

export async function GET() {
    try {
        const { count, error } = await keepAlive();

        if (error) {
            console.error("Supabase keep-alive query failed:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Add Cache-Control to prevent Vercel from caching the response
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

export async function HEAD() {
    try {
        const { error } = await keepAlive();

        if (error) {
            console.error("Supabase keep-alive query failed:", error);
            return new NextResponse(null, { status: 500 });
        }

        return new NextResponse(null, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return new NextResponse(null, { status: 500 });
    }
}

// Add OPTIONS handler just in case Uptime Robot sends pre-flight checks
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Allow': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        },
    });
}
