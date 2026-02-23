import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  gray?: boolean;
}

export default function Section({
  children,
  className,
  id,
  gray,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-16 sm:px-6 md:py-20",
        gray && "bg-gray-50",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
