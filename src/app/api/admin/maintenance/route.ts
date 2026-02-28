export async function POST(req: Request) {
  const { enabled } = await req.json()

  if (!process.env.EDGE_CONFIG_ID || !process.env.VERCEL_API_TOKEN) {
    return Response.json(
      { error: "Edge config not configured" },
      { status: 500 }
    )
  }

   // 🔐 Verify admin here (call your verify-session)
  // If not admin → return 401

  await fetch(
    `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation: "upsert", key: "maintenance", value: enabled }],
      }),
    }
  )

  return Response.json({ success: true })
}