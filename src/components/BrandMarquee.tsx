import Image from "next/image";

type Brand = {
  readonly name: string;
  readonly description: string;
  readonly logo: string;
};

export default function BrandMarquee({ brands }: { brands: readonly Brand[] }) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
        >
          <div className="flex h-16 w-full items-center justify-center">
            <Image
              src={brand.logo}
              alt={`Logo ${brand.name}`}
              width={160}
              height={64}
              className="h-full w-auto object-contain grayscale transition-all group-hover:grayscale-0"
            />
          </div>
          <span className="text-sm font-medium text-gray-400 group-hover:text-brand-500">
            {brand.description}
          </span>
        </div>
      ))}
    </div>
  );
}
