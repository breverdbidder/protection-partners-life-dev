import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";

// Lead capture endpoint. If LEAD_WEBHOOK_URL is set (see .env.example) the lead
// is forwarded there as JSON; otherwise it's logged so local testing works
// before a CRM is chosen.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = { ...parsed.data, receivedAt: new Date().toISOString() };
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error(`Lead webhook responded ${res.status}`, lead);
      return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
    }
  } else {
    console.log("[lead] LEAD_WEBHOOK_URL not set — logging lead:", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
