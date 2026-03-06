import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-6 text-center">
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-cinnabar" />

      <div className="max-w-xs w-full flex flex-col items-center gap-8">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/crawl_trans.png"
          alt="Kaamulan Coffee Crawl 2026"
          className="w-64 drop-shadow-sm"
        />

        {/* Heading */}
        <div className="space-y-3">
          <p className="text-xs text-olive tracking-widest uppercase">Welcome to</p>
          <h1 className="text-2xl font-bold text-carbon leading-tight">
            Kaamulan Coffee<br />Crawl Gallery
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-cinnabar/30" />
            <span className="text-xs text-cinnabar/50 tracking-widest font-medium">2026</span>
            <span className="h-px w-10 bg-cinnabar/30" />
          </div>
          <p className="text-olive text-sm pt-1">Share and relive the memories.</p>
        </div>

        {/* CTAs */}
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/upload"
            className="w-full py-3.5 px-6 bg-cinnabar text-linen rounded-2xl font-semibold text-sm hover:bg-cinnabar/85 transition shadow-sm"
          >
            Share a Photo
          </Link>
          <Link
            href="/gallery"
            className="w-full py-3.5 px-6 border border-carbon/15 text-carbon rounded-2xl font-medium text-sm hover:bg-carbon/5 transition"
          >
            View Gallery
          </Link>
        </div>

        <p className="text-cinnabar/25 text-xl tracking-widest">✦ ✦ ✦</p>
      </div>
    </main>
  );
}
