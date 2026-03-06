import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Auth check bypassed for UI review — restore before deploying
export async function POST(req: NextRequest) {
  const { url, publicId, uploaderName, description } = await req.json();

  if (!url || !publicId || !uploaderName || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const photo = await prisma.photo.create({
    data: { cloudinaryId: publicId, url, uploaderName, description },
  });

  return NextResponse.json(photo, { status: 201 });
}
