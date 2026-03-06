import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth bypassed for UI review — restore before deploying
export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/gallery/:path*", "/upload/:path*"],
};
