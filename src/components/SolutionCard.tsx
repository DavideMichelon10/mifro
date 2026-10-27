import Image from "next/image";
import { Check, CreditCard, MonitorCog } from "lucide-react";
import { productImages, type Solution } from "@/content/sectors";
import ProductGallery from "@/components/ProductGallery";

export default function SolutionCard({
  solution,
  headingLevel = "h3",
  imageSizes = "(max-width: 767px) calc(100vw - 80px), 320px",
}: {
  solution: Solution;
  headingLevel?: "h2" | "h3";
  imageSizes?: string;
}) {
  const image = productImages[solution.name];
  const Heading = headingLevel;
  const Illustration = solution.name === "POS per pagamenti" ? CreditCard : MonitorCog;

  return (
    <article className="surface-card flex min-w-0 flex-col p-6 sm:p-8 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0 md:p-5 lg:p-6 xl:p-8">
      <div className="mb-5 min-w-0">
        {solution.gallery ? (
          <ProductGallery images={solution.gallery} name={solution.name} sizes={imageSizes} />
        ) : image ? (
          <Image {...image} alt={image.alt} sizes={imageSizes} className="h-44 w-full object-contain sm:h-48" />
        ) : (
          <div className="flex h-44 items-center justify-center rounded-lg bg-brand-50 sm:h-48" aria-hidden="true">
            <Illustration className="h-24 w-24 text-brand-600" strokeWidth={1.25} />
          </div>
        )}
      </div>
      <Heading className="text-2xl font-bold tracking-tight text-brand-900">{solution.name}</Heading>
      <ul className="mt-5 space-y-3 border-t border-gray-200 pt-5">
        {solution.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
