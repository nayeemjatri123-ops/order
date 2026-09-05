import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
    }

    const body = await request.json();
    const required = ["name", "phone", "address", "district", "size", "color", "deal", "total"];
    const missing = required.filter((field) => body[field] === undefined || body[field] === "");

    if (missing.length) {
      return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
    const { error } = await supabase.from("orders").insert({
      customer_name: body.name,
      phone: body.phone,
      address: body.address,
      district: body.district,
      size: body.size,
      color: body.color,
      deal: body.deal,
      total: Number(body.total),
      status: "new",
    });

    if (error) {
      console.error("Supabase order insert failed", error);
      return NextResponse.json({ error: "Unable to save order" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API failed", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
