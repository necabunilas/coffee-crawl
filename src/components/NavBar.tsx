"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-carbon px-8 py-5 flex items-center justify-between">
      <Link href="/gallery" className="text-linen font-semibold text-sm tracking-wide">
        Gallery
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/gallery"
          className={`text-sm transition ${
            pathname === "/gallery" ? "text-gold" : "text-linen/60 hover:text-linen"
          }`}
        >
          Photos
        </Link>
        <Link
          href="/upload"
          className={`text-sm transition ${
            pathname === "/upload" ? "text-gold" : "text-linen/60 hover:text-linen"
          }`}
        >
          Upload
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-linen/30 hover:text-linen/60 transition ml-4"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
