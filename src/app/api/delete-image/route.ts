import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { public_id } = body;

    if (!public_id) {
      return new Response(JSON.stringify({ message: "public_id is required" }), {
        status: 400,
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
  }
}
