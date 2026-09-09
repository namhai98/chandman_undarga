import { Reveal } from "./ui/Reveal.jsx";
import { CONTACT } from "../data/content.js";

export function Location() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="container-x grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Холбоо барих</p>
          <h2 className="mt-4 text-4xl text-forest-dark sm:text-5xl">
            Та биднийг <em>эндээс олно</em>
          </h2>

          <dl className="mt-10 grid gap-7">
            <div>
              <dt className="eyebrow">Хаяг</dt>
              <dd className="mt-2 text-lg text-ink/80">
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Ажиллах цаг</dt>
              <dd className="mt-2 text-lg text-ink/80">
                {CONTACT.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Утас</dt>
              <dd className="mt-2 text-lg">
                <a href={CONTACT.phoneHref} className="text-forest hover:underline">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={CONTACT.phoneHref} className="btn btn--primary">
              Залгах
            </a>
            <a
              href={CONTACT.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              Замын заавар
            </a>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div
            className="map-frame"
            role="img"
            aria-label="Байршлын зураглал — БГД, «Эрхи» төв"
          >
            <svg className="map-lines" viewBox="0 0 400 320" fill="none" aria-hidden="true">
              <path d="M0 90h400M0 210h400M120 0v320M280 0v320" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M0 40C120 60 180 150 400 140"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
              />
              <rect x="150" y="120" width="70" height="60" rx="6" fill="currentColor" opacity=".14" />
            </svg>
            <span className="map-pin" aria-hidden="true">
              <svg viewBox="0 0 32 40" fill="none">
                <path
                  d="M16 39c8-11 12-18 12-24a12 12 0 1 0-24 0c0 6 4 13 12 24Z"
                  fill="currentColor"
                />
                <circle cx="16" cy="15" r="4.5" fill="#fff" />
              </svg>
            </span>
            <span className="map-frame__label">«Эрхи» төв · 8 давхар, 802</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
