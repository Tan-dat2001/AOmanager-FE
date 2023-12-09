import { Image } from "@mantine/core";
import { CSSProperties } from "react";

type ProductImageProps = {
  width: number;
  height: number;
  src?: string;
  style?: CSSProperties;
  className?: string;
};

export function ProductImage({ width, height, src, style, className }: ProductImageProps) {
  const defaultUrl = "/images/product_image.svg";
  const isValidUrl = src && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("blob"));
  const imageUrl = isValidUrl ? src : defaultUrl;

  return (
    <Image
      src={imageUrl}
      alt="Image"
      width={width}
      height={height}
      className={className}
      style={{ width: "fit-content", ...(style || {}) }}
    />
  );
}
