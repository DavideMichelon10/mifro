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
        "py-12 sm:py-16",
        gray && "bg-gray-50",
        className
      )}
    >
      <div className="site-container">{children}</div>
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
      <h2 className="section-title">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
