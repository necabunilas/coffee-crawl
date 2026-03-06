"use client";

import { useEffect, useCallback, useRef, useState } from "react";

type Photo = {
  id: string;
  url: string;
  uploaderName: string;
  description: string;
};

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const currentPhoto = photos[currentIndex];
  const touchStartX = useRef<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrevious, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [handleKeyDown]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setSwipeOffset(e.touches[0].clientX - touchStartX.current);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (swipeOffset > 50 && currentIndex > 0) onPrevious();
    else if (swipeOffset < -50 && currentIndex < photos.length - 1) onNext();
    touchStartX.current = null;
    setSwipeOffset(0);
  }, [swipeOffset, currentIndex, photos.length, onPrevious, onNext]);

  if (!currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-carbon/95 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Counter */}
      <div className="absolute top-4 left-4 text-xs text-linen/50 uppercase tracking-widest">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-linen/60 hover:text-linen bg-white/10 hover:bg-white/20 transition"
        aria-label="Close"
      >
        ×
      </button>

      {/* Prev */}
      {currentIndex > 0 && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-linen/60 hover:text-linen bg-white/10 hover:bg-white/20 transition text-2xl"
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {currentIndex < photos.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-linen/60 hover:text-linen bg-white/10 hover:bg-white/20 transition text-2xl"
          aria-label="Next"
        >
          ›
        </button>
      )}

      {/* Image */}
      <div
        className="flex flex-col items-center transition-transform duration-100"
        style={{ transform: `translateX(${swipeOffset * 0.4}px)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentPhoto.url}
          alt={currentPhoto.uploaderName ?? "Photo"}
          className="max-w-[90vw] max-h-[80vh] object-contain select-none pointer-events-none"
          draggable={false}
        />
        <div className="mt-4 text-center space-y-1 px-4">
          {currentPhoto.uploaderName && (
            <p className="text-sm text-linen font-medium">{currentPhoto.uploaderName}</p>
          )}
          {currentPhoto.description && (
            <p className="text-xs text-linen/60">{currentPhoto.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
