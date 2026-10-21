import Image from "next/image";
import { siteConfig } from "@/content/site";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 32 }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ width: Math.round(size * 7443 / 1742) }}
    >
      <Image
        src="/images/logo-mifro.png"
        alt={`${siteConfig.shortName} logo`}
        height={1742}
        width={7443}
        sizes={`${Math.round(size * 7443 / 1742)}px`}
        priority
        className="h-auto w-full shrink-0"
      />
    </div>
  );
}
