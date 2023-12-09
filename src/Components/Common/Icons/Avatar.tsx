import Image from "next/image";
import { CSSProperties } from "react";

type AvatarProps = {
  width: number;
  height: number;
  src?: string;
  style?: CSSProperties;
  className?: string;
};

export function Avatar({ width, height, src, style, className }: AvatarProps) {
  const defaultUrl = "/images/account.svg";
  const isValidUrl = src && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("blob"));
  const imageUrl = isValidUrl ? src : defaultUrl;

  return (
    <div className={className} style={{ height: height, width: width, ...(style || {}) }}>
      <Image src={imageUrl} alt="Avatar" width={width} height={height} priority />
    </div>
  );
}
