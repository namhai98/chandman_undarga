import { NAV_LINKS, CONTACT } from "../data/content.js";
import { BrandMark } from "./BrandMark.jsx";

const SOCIAL = [
  {
    label: "Facebook",
    d: "M13 22v-8h3l1-4h-4V7c0-1.1.3-2 2-2h2V1.2C18 1.1 16.8 1 15.4 1 12.5 1 10.5 2.8 10.5 6v4H7v4h3.5v8H13Z",
  },
];

export function Footer() {
  return (
    <footer className="on-dark bg-forest-dark text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-3 lg:gap-16">
        <div>
          <div className="flex items-center gap-3 text-white">
            <BrandMark className="h-9 w-9" />
            <p className="font-display text-xl leading-tight">
              ЧАНДМАНЬ УНДАРГА
              <span className="block text-[0.62rem] font-sans tracking-[0.22em] uppercase text-sage-soft">
                Энергийн төв
              </span>
            </p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Таны амралт. Таны эрч хүч.
            <br />
            Таны өөртөө зориулсан цаг.
          </p>
        </div>

        <nav aria-label="Хөлийн цэс">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-soft">
            Хуудас
          </p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-soft">
            Холбоо барих
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              {CONTACT.hours[0]} · {CONTACT.hours[1]}
            </p>
            <p>
              <a href={CONTACT.phoneHref} className="text-white hover:underline">
                {CONTACT.phone}
              </a>
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
            <a
              href={CONTACT.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Байршил"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M12 21c5-5.5 8-9 8-12a8 8 0 1 0-16 0c0 3 3 6.5 8 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ЧАНДМАНЬ УНДАРГА энергийн төв. Бүх эрх
            хуулиар хамгаалагдсан.
          </p>
          <p>Үйлчилгээ нь амралт, тайвшралыг дэмжих зорилготой.</p>
        </div>
      </div>
    </footer>
  );
}
