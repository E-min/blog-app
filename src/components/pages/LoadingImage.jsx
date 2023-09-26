import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

export default function LoadingImage({ url, alt }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = url;
    img.onerror = () => {
      console.error("Failed to load image.");
    };
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return (
    <>
      {imageLoaded ? (
        <img
          src={url}
          alt={alt}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ) : (
        <div style={{ width: "100%" }}>
          <Skeleton variant="rectangular" height={150} />
        </div>
      )}
    </>
  );
}
