import Link from "next/link";
import Image from "next/image";
import { Icon, type IconName } from "@/components/Icons";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  icon: IconName;
  image?: string;
  href?: string;
  compactMobile?: boolean;
}

export default function Card({ title, description, icon, image, href, compactMobile = false }: CardProps) {
  const content = (
    <div className={`group flex h-full ${compactMobile ? "flex-row sm:flex-col" : "flex-col"} overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md`}>
      {image && (
        <div className={`relative shrink-0 ${compactMobile ? "w-24 sm:aspect-[4/3] sm:w-full" : "aspect-[4/3] w-full"} overflow-hidden bg-gray-100`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      )}
      <div className={`flex min-w-0 flex-1 flex-col ${compactMobile ? "p-4 sm:p-6" : "p-6"}`}>
        {!image && (
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name={icon} className="h-5 w-5" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
        {href && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 transition-colors group-hover:text-brand-700">
            Scopri di più
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">{content}</Link>;
  }
  return content;
}
