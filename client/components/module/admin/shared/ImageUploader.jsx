"use client";

import { useRef } from "react";
import Image from "next/image";

/**
 * Reusable image upload component with drag-and-drop.
 * Creates local blob URLs for preview — no server upload yet.
 */
export default function ImageUploader({
  images = [],
  onChange,
  multiple = false,
  label = "Upload Images",
}) {
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const newUrls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => URL.createObjectURL(f));

    if (multiple) {
      onChange([...images, ...newUrls]);
    } else {
      onChange(newUrls.length > 0 ? [newUrls[0]] : images);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-400", "bg-blue-50");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
      </div>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          {images.map((url, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden">
              <div className="relative h-24">
                <Image src={url} alt={`Upload ${i + 1}`} fill className="object-cover" sizes="25vw" unoptimized={url.startsWith("blob:")} />
              </div>
              <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                ×
              </button>
              {i === 0 && multiple && (
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">Cover</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
