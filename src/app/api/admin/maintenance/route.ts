export async function POST(req: Request) {
  const { enabled } = await req.json()

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