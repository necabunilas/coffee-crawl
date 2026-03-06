import { NextRequest, NextResponse } from "next/server";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

// Auth check bypassed for UI review — restore before deploying
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const photo = await prisma.photo.findUnique({ where: { id } });
  if (!photo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteFromCloudinary(photo.cloudinaryId);
  await prisma.photo.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
