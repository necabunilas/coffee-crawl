import Link from "next/link";
import DropzoneUploader from "@/components/DropzoneUploader";

export default function UploadPage() {
  return (
    <main className="min-h-dvh p-6 md:p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/crawl_trans.png"
            alt="Kaamulan Coffee Crawl 2026"
            className="w-44 mx-auto mb-5"
          />
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-cinnabar/40" />
            <p className="text-xs text-carbon tracking-wider uppercase">Share a Memory</p>
            <span className="h-px w-8 bg-cinnabar/40" />
          </div>
        </div>

        <DropzoneUploader />

        <div className="text-center mt-6">
          <Link
            href="/gallery"
            className="text-sm text-olive hover:text-carbon transition"
          >
            ← Back to gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
