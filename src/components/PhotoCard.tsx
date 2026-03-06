type Photo = {
  id: string;
  url: string;
  uploaderName: string;
  description: string;
};

export default function PhotoCard({
  photo,
  onOpen,
}: {
  photo: Photo;
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
      {/* Overlay with uploader name */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity rounded-xl flex items-end p-3">
        <p className="text-white text-xs font-medium truncate leading-tight">
          {photo.uploaderName}
        </p>
      </div>
    </div>
  );
}
