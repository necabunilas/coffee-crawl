"use client";

import { useState } from "react";
import PhotoCard from "./PhotoCard";
import Lightbox from "./Lightbox";

type Photo = {
  id: string;
  url: string;
  uploaderName: string;
  description: string;
  createdAt: Date;
};

export default function PhotoGrid({ initialPhotos }: { initialPhotos: Photo[] }) {
  const [photos] = useState(initialPhotos);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-olive/60 text-sm">No photos yet.</p>
        <a
          href="/upload"
          className="mt-3 inline-block text-sm text-carbon underline underline-offset-4 decoration-carbon/30 hover:decoration-carbon transition"
        >
          Upload your first photo
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onOpen={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrevious={() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() =>
            setLightboxIndex((i) =>
              i !== null && i < photos.length - 1 ? i + 1 : i
            )
          }
        />
      )}
    </>
  );
}
