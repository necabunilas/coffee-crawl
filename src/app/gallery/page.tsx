import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PhotoGrid from "@/components/PhotoGrid";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/crawl_trans.png"
            alt="Kaamulan Coffee Crawl 2026"
            className="w-48 md:w-64 mx-auto mb-4"
          />
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-8 bg-cinnabar/40" />
            <p className="text-xs text-carbon tracking-wider uppercase">Photo Gallery</p>
            <span className="h-px w-8 bg-cinnabar/40" />
          </div>
          <p className="text-olive text-sm">
            {photos.length} {photos.length === 1 ? "photo" : "photos"} shared
          </p>
        </div>

        {/* Gallery */}
        <PhotoGrid initialPhotos={photos} />

        {/* Upload CTA */}
        <div className="text-center mt-12 py-8 border-t border-cinnabar/20">
          <p className="text-olive mb-4">Have photos to share?</p>
          <Link
            href="/upload"
            className="inline-block py-3 px-6 bg-cinnabar text-linen rounded-xl hover:bg-cinnabar/80 transition font-medium"
          >
            Upload Photos
          </Link>
        </div>

        <div className="text-center mt-10 text-cinnabar/40 text-2xl tracking-widest">
          ✦ ✦ ✦
        </div>

      </div>
    </main>
  );
}
