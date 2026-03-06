import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-sm w-full space-y-8">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/crawl_trans.png"
          alt="Kaamulan Coffee Crawl 2026"
          className="w-56 mx-auto"
        />

        {/* Tagline */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cinnabar/40" />
            <p className="text-xs text-carbon tracking-wider uppercase">Photo Gallery</p>
            <span className="h-px w-8 bg-cinnabar/40" />
          </div>
          <p className="text-olive text-sm">Share and relive the memories.</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/upload"
            className="w-full py-3 px-6 bg-cinnabar text-linen rounded-xl font-medium text-sm hover:bg-cinnabar/80 transition"
          >
            Share a Photo
          </Link>
          <Link
            href="/gallery"
            className="w-full py-3 px-6 bg-olive/10 text-carbon rounded-xl font-medium text-sm hover:bg-olive/20 transition"
          >
            View Gallery
          </Link>
        </div>

        <p className="text-cinnabar/30 text-2xl tracking-widest">✦ ✦ ✦</p>
      </div>
    </main>
  );
}
