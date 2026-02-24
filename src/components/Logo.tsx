import Image from "next/image";
import { siteConfig } from "@/content/site";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 32 }: LogoProps) {
  return (
    <Image
      src={siteConfig.logo}
      alt={`${siteConfig.shortName} logo`}
      height={size}
      width={size * 4}
      className={className}
      priority
    />
  );
}
