import Image from "next/image";
import { CSSProperties } from "react";

type LogoProps = {
  width: number;
  height: number;
  style?: CSSProperties;
  className?: string;
};

export function Logo({ width, height, style, className }: LogoProps) {
  return (
    <Image
      src="/images/logo.svg"
      alt="Logo"
      width={width}
      height={height}
      priority
      style={{ ...(style || {}) }}
      className={className}
    />
  );
}
