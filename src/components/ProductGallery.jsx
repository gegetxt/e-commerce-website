import { useEffect, useMemo, useState } from "react";

export function generateImageVariants(images) {
  if (!Array.isArray(images) || images.length === 0) return [];

  if (images.length >= 2) return images;

  const first = images[0];
  const url = first?.url || first;
  if (typeof url !== "string") return images;

  let variantUrl = "";
  if (url.includes("_org_zoom")) {
    variantUrl = url.replace("_org_zoom", "_org");
  } else if (url.includes("_org")) {
    variantUrl = url.replace("_org", "_org_zoom");
  }

  if (!variantUrl || variantUrl === url) return images;

  const urls = [url, variantUrl].filter((u, idx, arr) => arr.indexOf(u) === idx);
  const isNonZoom = (u) => u.includes("_org") && !u.includes("_org_zoom");
  const sorted = urls.sort((a, b) => (isNonZoom(b) ? 1 : 0) - (isNonZoom(a) ? 1 : 0));

  return sorted.map((u, idx) => ({
    ...first,
    url: u,
    fallbackUrl: sorted[(idx + 1) % sorted.length],
    index: first?.index != null ? first.index + idx : idx,
  }));
}

export default function ProductGallery({ images = [], alt = "Product image", resetKey }) {
  const normalizedImages = useMemo(() => {
    const list = generateImageVariants(images).map((img) => {
      if (typeof img === "string") return { url: img };
      return { ...img };
    });

    if (list.length === 1) {
      return [list[0], list[0]];
    }

    return list;
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [resetKey, normalizedImages.length]);

  const activeImage = normalizedImages[activeIndex];
  const isZoomImage =
    typeof activeImage?.url === "string" && activeImage.url.includes("_org_zoom");

  return (
    <div className="w-full flex flex-col gap-[19px]">
      <div className="relative w-full h-[450px] rounded-[5px] overflow-hidden bg-white">
        <img
          src={activeImage?.url}
          alt={alt}
          className={`w-full h-full ${
            isZoomImage ? "object-cover scale-[1.05]" : "object-contain"
          }`}
          onError={(e) => {
            const fallback = activeImage?.fallbackUrl;
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
        />
      </div>
      <div className="flex items-center gap-[19px]">
        {normalizedImages.map((img, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={img?.index || img?.url || index}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              className={`w-[100px] h-[75px] rounded-[5px] overflow-hidden bg-white border ${
                isActive ? "border-[#23A6F0]" : "border-transparent"
              }`}
              aria-label={`Thumbnail ${index + 1}`}
            >
              <img
                src={img?.url}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  const fallback = img?.fallbackUrl;
                  if (fallback && e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
