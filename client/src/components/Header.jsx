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
        solid
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(22,61,45,0.08)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-x flex items-center justify-between gap-4 py-4">
        {/* Brand */}
        <a
          href="#home"
          className={[
            "flex items-center gap-3 transition-colors",
            solid ? "text-forest-dark" : "text-white",
          ].join(" ")}
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark className="w-8 h-8 shrink-0" />
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.14em]">
              ЧАНДМАНЬ УНДАРГА
            </span>
            <span
              className={[
                "block text-[0.62rem] tracking-[0.22em] uppercase",
                solid ? "text-sage" : "text-sage-soft",
              ].join(" ")}
            >
              Энергийн төв
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Үндсэн цэс">
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
          <button
            type="button"
            className="btn btn--primary whitespace-nowrap"
            onClick={openGiftModal}
          >
            Бэлгийн карт авах
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            className="btn btn--primary !px-4 !py-2.5 text-xs"
            onClick={openGiftModal}
          >
            Бэлгийн карт
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={[
              "relative grid h-10 w-10 place-items-center rounded-full border transition-colors",
              solid
                ? "border-forest/20 text-forest-dark"
                : "border-white/30 text-white",
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

      {/* Mobile menu panel */}
      <div
        className={[
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-[400ms] ease-out",
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="container-x pb-8 pt-2" aria-label="Гар утасны цэс">
          <ul className="flex flex-col divide-y divide-sage-soft/50">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-lg text-forest-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn--primary btn--block mt-6"
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
