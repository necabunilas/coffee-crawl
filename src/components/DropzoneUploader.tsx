"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

async function uploadToCloudinary(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Cloudinary upload failed");
  }

  const data = await res.json();
  return { url: data.secure_url as string, publicId: data.public_id as string };
}

export default function DropzoneUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploaderName, setUploaderName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  async function handleUpload() {
    if (!file) return;
    if (!uploaderName.trim()) { setError("Please enter your name."); return; }
    if (!description.trim()) { setError("Please add a description."); return; }
    setLoading(true);
    setError("");

    try {
      const { url, publicId } = await uploadToCloudinary(file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, publicId, uploaderName, description }),
      });

      if (res.ok) {
        router.push("/gallery");
      } else {
        const data = await res.json();
        setError(data.error ?? "Failed to save photo.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-xl bg-olive/10 px-4 py-3 text-sm text-carbon placeholder:text-olive/50 focus:outline-none focus:ring-2 focus:ring-cinnabar/30 transition";

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`rounded-2xl border-2 border-dashed py-12 text-center cursor-pointer transition select-none ${
          isDragActive
            ? "border-cinnabar bg-cinnabar/5"
            : preview
            ? "border-olive/20 bg-olive/5"
            : "border-olive/30 hover:border-cinnabar/50 hover:bg-cinnabar/5"
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="px-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-56 mx-auto object-contain rounded-xl shadow-sm"
            />
            <p className="text-xs text-olive mt-3">Tap to change photo</p>
          </div>
        ) : (
          <div className="px-4">
            <svg
              className="w-8 h-8 mx-auto mb-3 text-olive/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-carbon text-sm font-medium">
              {isDragActive ? "Drop it here" : "Drop a photo here"}
            </p>
            <p className="text-olive text-xs mt-1">or tap to browse · max 10 MB</p>
          </div>
        )}
      </div>

      {/* Name + description — shown after photo is selected */}
      {file && (
        <>
          <input
            type="text"
            placeholder="Your name"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Say something about this photo… (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </>
      )}

      {error && <p className="text-cinnabar text-xs text-center">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full bg-cinnabar text-linen rounded-xl px-4 py-3 text-sm font-medium hover:bg-cinnabar/80 disabled:bg-olive/20 disabled:text-olive/40 disabled:cursor-not-allowed transition"
      >
        {loading ? "Uploading…" : "Share photo"}
      </button>
    </div>
  );
}
