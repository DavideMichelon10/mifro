"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { contactContextForPath } from "@/lib/contact-context";
import Logo from "@/components/Logo";

function SolutionLinks({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <ul className="space-y-0.5">
      {siteConfig.sectors.map(({ title, href }) => (
        <li key={href}>
          <Link
            href={href}
            onClick={onNavigate}
            aria-current={pathname === href ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600",
              pathname === href ? "bg-brand-50 font-semibold text-brand-600" : "text-gray-700 hover:bg-brand-50 hover:text-brand-600"
            )}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState<"desktop" | "mobile" | null>(null);
  const pathname = usePathname();
  const contactHref = contactContextForPath(pathname).sector === "generico" ? "/contatti" : "#richiedi-proposta";
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const desktopDropdown = useRef<HTMLLIElement>(null);
  const desktopTrigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  function closeNavigation() {
    setOpen(false);
    setSolutionsOpen(null);
  }

  useEffect(() => {
    if (!open && !solutionsOpen) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (solutionsOpen) {
        event.preventDefault();
        setSolutionsOpen(null);
        (solutionsOpen === "desktop" ? desktopTrigger : mobileTrigger).current?.focus();
      } else if (open) {
        event.preventDefault();
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      if (solutionsOpen === "desktop" && !desktopDropdown.current?.contains(event.target)) setSolutionsOpen(null);
      if (open && !header.current?.contains(event.target)) {
        setOpen(false);
        setSolutionsOpen(null);
      }
    }
    function closePanels() {
      setOpen(false);
      setSolutionsOpen(null);
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    desktop.addEventListener("change", closePanels);
    window.addEventListener("popstate", closePanels);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      desktop.removeEventListener("change", closePanels);
      window.removeEventListener("popstate", closePanels);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, solutionsOpen]);

  function focusSolutions(event: KeyboardEvent<HTMLButtonElement>, mode: "desktop" | "mobile") {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setSolutionsOpen(mode);
    requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>(`#${mode}-solutions a`)?.focus());
  }

  return (
    <header ref={header} className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav className="site-container flex items-center justify-between py-3 sm:py-4" aria-label="Navigazione principale">
        <Link href="/" onClick={closeNavigation} aria-label={`${siteConfig.shortName} – Torna alla home`}><Logo size={34} /></Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.filter((item) => item.href !== "/contatti").map((item) => (
            item.href === "/#settori" ? (
              <li
                key={item.href}
                ref={desktopDropdown}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setSolutionsOpen(null);
                }}
              >
                <button
                  ref={desktopTrigger}
                  type="button"
                  aria-expanded={solutionsOpen === "desktop"}
                  aria-controls="desktop-solutions"
                  onClick={() => setSolutionsOpen(solutionsOpen === "desktop" ? null : "desktop")}
                  onKeyDown={(event) => focusSolutions(event, "desktop")}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-3 rounded-lg px-3.5 text-[15px] font-medium hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600",
                    pathname.startsWith("/soluzioni/") || solutionsOpen === "desktop" ? "bg-brand-50 text-brand-600" : "text-gray-600"
                  )}
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform", solutionsOpen === "desktop" && "rotate-180")} />
                </button>
                <div id="desktop-solutions" hidden={solutionsOpen !== "desktop"} className="surface-card absolute left-1/2 top-full mt-2 max-h-[calc(100dvh-6rem)] w-72 -translate-x-1/2 overflow-y-auto p-3 shadow-lg">
                  <SolutionLinks pathname={pathname} onNavigate={closeNavigation} />
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} onClick={closeNavigation} aria-current={pathname === item.href ? "page" : undefined} className={cn("inline-flex min-h-11 items-center rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-brand-50", isActive(item.href) ? "bg-brand-50 text-brand-600" : "text-gray-600 hover:text-brand-700")}>
                  {item.label}
                </Link>
              </li>
            )
          ))}
          <li className="ml-3"><Link href={contactHref} onClick={closeNavigation} aria-current={pathname === "/contatti" ? "page" : undefined} className="button button-primary">Contattaci</Link></li>
        </ul>

        <button type="button" ref={toggle} aria-controls="mobile-navigation" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-brand-700 hover:bg-brand-50 lg:hidden" onClick={() => { setOpen(!open); setSolutionsOpen(null); }} aria-expanded={open} aria-label={open ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}>
          {open ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
        </button>
      </nav>

      <div id="mobile-navigation" hidden={!open} className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-gray-100 bg-white lg:hidden">
        <ul className="space-y-1 px-4 py-3">
          {siteConfig.nav.filter((item) => item.href !== "/contatti").map((item) => (
            <li key={item.href}>
              {item.href === "/#settori" ? (
                <>
                  <button
                    type="button"
                    ref={mobileTrigger}
                    aria-expanded={solutionsOpen === "mobile"}
                    aria-controls="mobile-solutions"
                    onClick={() => setSolutionsOpen(solutionsOpen === "mobile" ? null : "mobile")}
                    onKeyDown={(event) => focusSolutions(event, "mobile")}
                    className={cn(
                      "flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-base font-medium hover:bg-brand-50",
                      pathname.startsWith("/soluzioni/") || solutionsOpen === "mobile" ? "bg-brand-50 text-brand-600" : "text-gray-700"
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform", solutionsOpen === "mobile" && "rotate-180")} />
                  </button>
                  <div id="mobile-solutions" hidden={solutionsOpen !== "mobile"} className="my-2 ml-3 border-l-2 border-brand-100 pl-2">
                    <SolutionLinks pathname={pathname} onNavigate={closeNavigation} />
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={closeNavigation} aria-current={pathname === item.href ? "page" : undefined} className={cn("block min-h-12 rounded-lg px-3 py-3 text-base font-medium transition-colors", isActive(item.href) ? "bg-brand-50 text-brand-600" : "text-gray-600 hover:bg-brand-50 hover:text-brand-700")}>{item.label}</Link>
              )}
            </li>
          ))}
          <li className="pt-2"><Link href={contactHref} onClick={closeNavigation} aria-current={pathname === "/contatti" ? "page" : undefined} className="button button-primary w-full">Contattaci</Link></li>
        </ul>
      </div>
    </header>
  );
}
