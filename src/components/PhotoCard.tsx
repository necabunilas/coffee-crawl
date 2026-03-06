type Photo = {
  id: string;
  url: string;
  uploaderName: string;
  description: string;
};

export default function PhotoCard({
  photo,
  onDelete,
  onOpen,
}: {
  photo: Photo;
  onDelete: () => void;
  onOpen: () => void;
}) {
  return (
    <div
      className="relative aspect-square group cursor-pointer"
      onClick={onOpen}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt={photo.uploaderName ?? "Photo"}
        className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-[1.02]"
        loading="lazy"
      />
      {/* Overlay: hover on desktop, always visible on touch devices */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity rounded-xl flex items-end justify-between p-3">
        <p className="text-white text-xs font-medium truncate max-w-[70%] leading-tight">
          {photo.uploaderName}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-cinnabar text-white text-xl leading-none transition"
          aria-label="Delete photo"
        >
          ×
        </button>
      </div>
    </div>
  );
}
