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
      style={{ width: size * 4.27, height: size }}
    >
      <Image
        src="/images/logo-mifro.png"
        alt={`${siteConfig.shortName} logo`}
        height={size}
        width={size * 4.27}
        priority
        className="shrink-0"
      />
    </div>
  );
}
