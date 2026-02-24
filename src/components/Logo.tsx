import Image from "next/image";
import { siteConfig } from "@/content/site";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 32 }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-lg ${className ?? ""}`}
      style={{ width: size * 3, height: size }}
    >
      <Image
        src="/images/logo500x500.png"
        alt={`${siteConfig.shortName} logo`}
        height={size * 3}
        width={size * 3}
        priority
        className="shrink-0"
      />
    </div>
  );
}
