"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { TOP_COLLEGES_FALLBACK_IMAGE } from "@/components/colleges/topCollegesData";

/**
 * Next/Image with fallback on error. Parent must be `relative` with defined height.
 */
export default function CollegeImage({
  src,
  alt,
  className = "object-cover transition duration-500 ease-out",
  sizes = "(max-width: 1024px) 100vw, 320px",
  priority = false
}) {
  const [broken, setBroken] = useState(false);
  const url = broken || !src ? TOP_COLLEGES_FALLBACK_IMAGE : src;

  const onError = useCallback(() => {
    setBroken(true);
  }, []);

  return (
    <>
      <Image
        src={url}
        alt={alt || "College"}
        fill
        className={className}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onError={onError}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#002147]/65 via-[#002147]/12 to-transparent" />
    </>
  );
}
