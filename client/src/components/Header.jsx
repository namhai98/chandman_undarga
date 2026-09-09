import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content.js";
import { useScrolled } from "../hooks/useScrolled.js";
import { useGiftModal } from "../context/giftModal.jsx";
import { BrandMark } from "./BrandMark.jsx";

export function Header() {
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openGiftModal } = useGiftModal();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        menuOpen
          ? "bg-cream"
          : solid
            ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(22,61,45,0.08)]"
            : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-x flex items-center justify-between gap-2 py-3 sm:gap-4 sm:py-4">
        {/* Brand */}
        <a
          href="#home"
          className={[
            "flex shrink-0 items-center gap-2 transition-colors sm:gap-3",
            solid ? "text-forest-dark" : "text-white",
          ].join(" ")}
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[0.7rem] font-semibold tracking-[0.08em] sm:text-sm sm:tracking-[0.14em]">
              ЧАНДМАНЬ УНДАРГА
            </span>
            <span
              className={[
                "block whitespace-nowrap text-[0.55rem] uppercase tracking-[0.18em] sm:text-[0.62rem] sm:tracking-[0.22em]",
                solid ? "text-sage" : "text-sage-soft",
              ].join(" ")}
            >
              Энергийн төв
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Үндсэн цэс">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={[
                    "whitespace-nowrap text-[0.92rem] font-medium transition-opacity hover:opacity-70",
                    solid ? "text-ink" : "text-white/90",
                  ].join(" ")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--primary" onClick={openGiftModal}>
            Бэлгийн карт авах
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex min-w-0 shrink items-center justify-end gap-2 lg:hidden">
          <button
            type="button"
            className={[
              "btn min-w-0 !px-3 !py-2.5 !text-[0.7rem]",
              solid ? "btn--primary" : "btn--light",
            ].join(" ")}
            onClick={openGiftModal}
          >
            <span className="truncate">Бэлгийн карт</span>
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={[
              "relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors sm:h-10 sm:w-10",
              solid ? "border-forest/20 text-forest-dark" : "border-white/30 text-white",
            ].join(" ")}
          >
            <span className="sr-only">Цэс</span>
            <span className="flex flex-col gap-[5px]">
              <span
                className={[
                  "block h-[1.5px] w-5 bg-current transition-transform",
                  menuOpen ? "translate-y-[6.5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-[1.5px] w-5 bg-current transition-opacity",
                  menuOpen ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-[1.5px] w-5 bg-current transition-transform",
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu — full-height overlay */}
      <div
        className={[
          "overflow-hidden bg-cream transition-[max-height,opacity] duration-[350ms] ease-out lg:hidden",
          menuOpen ? "max-h-[100svh] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav
          className="container-x flex min-h-[calc(100svh-3.75rem)] flex-col pb-10 pt-2"
          aria-label="Гар утасны цэс"
        >
          <ul className="flex flex-col divide-y divide-sage-soft/40">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-[1.15rem] text-xl text-forest-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn--primary btn--block btn--lg mt-auto"
            onClick={() => {
              setMenuOpen(false);
              openGiftModal();
            }}
          >
            Бэлгийн карт авах
          </button>
        </nav>
      </div>
    </header>
  );
}
