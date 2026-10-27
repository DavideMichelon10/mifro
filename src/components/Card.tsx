import Link from "next/link";
import Image from "next/image";
import { Icon, type IconName } from "@/components/Icons";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  icon: IconName;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  imageSizes?: string;
  linkLabel?: string;
  href?: string;
  links?: { label: string; href: string }[];
  compactMobile?: boolean;
}

export default function Card({ title, description, icon, image, imageAlt, imageFit = "cover", imageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw", linkLabel = "Scopri di più", href, links, compactMobile = false }: CardProps) {
  const content = (
    <div className={`surface-card ${href ? "interactive-card" : ""} group flex h-full ${compactMobile ? "flex-row sm:flex-col" : "flex-col"} overflow-hidden`}>
      {image && (
        <div className={`relative shrink-0 ${compactMobile ? "w-24 sm:aspect-[4/3] sm:w-full" : "aspect-[4/3] w-full"} overflow-hidden bg-gray-100`}>
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className={imageFit === "contain" ? "object-contain p-2" : "object-cover"}
            sizes={imageSizes}
          />
        </div>
      )}
      <div className={`flex min-w-0 flex-1 flex-col ${compactMobile ? "p-4 sm:p-6" : "p-6"}`}>
        {!image && (
          <div className="icon-tile mb-5">
            <Icon name={icon} className="h-5 w-5" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
        {links && (
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-link">
                  {link.label}<ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {href && (
          <span className="text-link mt-4 group-hover:text-brand-700">
            {linkLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full rounded-2xl">{content}</Link>;
  }
  return content;
}
