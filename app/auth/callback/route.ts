import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Ambil "code" dari URL yang dikirim Google
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    // 2. Tukar "code" menjadi "session"
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 3. Lempar user ke halaman Dashboard (atau halaman asal)
  return NextResponse.redirect(`${requestUrl.origin}${next}`);
}
