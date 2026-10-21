import type { ReactNode } from "react";

export default function PageIntro({
  title,
  description,
  eyebrow = "Mifro · Trentino",
  children,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="site-container py-10 sm:py-14 lg:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title mt-4">{title}</h1>
          {description && <p className="lead mt-5 max-w-2xl">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
