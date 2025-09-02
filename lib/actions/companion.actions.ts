'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseAdminClient } from "../supabase";


export const createCompanion = async (formData: CreateCompanion) => {
    const {userId:author}=await auth();
    const supabase = createSupabaseAdminClient();

    const {data,error}=await supabase
        .from('companions')
        .insert({...formData,author})
        .select();

    if (error || !data) throw new Error(error?.message || 'Failed to create companion');

    return data[0];
    
}