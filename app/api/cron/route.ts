import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

async function keepAlive() {
    const supabase = createSupabaseClient();

    // Perform a lightweight query to check database connection
    // 'companions' table is known to exist from page.tsx
    // We select count to minimize data transfer
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

        return NextResponse.json({ message: "Cron job executed successfully", count });
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

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return new NextResponse(null, { status: 500 });
    }
}
