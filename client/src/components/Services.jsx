import { Reveal } from "./ui/Reveal.jsx";
import { SectionHead } from "./ui/Section.jsx";
import { useGiftModal } from "../context/giftModal.jsx";
import { SERVICES } from "../data/content.js";

function WaterGlyph() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16 text-sage" aria-hidden="true">
      <path
        d="M40 12c14 18 21 29 21 39a21 21 0 0 1-42 0c0-10 7-21 21-39Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M28 52a12 12 0 0 0 12 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ServiceCard({ service, index }) {
  const { openGiftModal } = useGiftModal();
  return (
    <Reveal
      as="article"
      delay={index}
      className={[
        "flex flex-col rounded-[1.5rem] border border-sage-soft/50 bg-white p-6 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1 sm:p-8",
        service.wide ? "md:col-span-2 lg:col-span-2" : "",
      ].join(" ")}
    >
      <span className="font-display text-3xl text-sage-soft">{service.no}</span>
      <h3 className="mt-3 text-2xl text-forest-dark">{service.title}</h3>
      <p className="mt-3 text-ink/70">{service.desc}</p>

      {service.benefits ? (
        <ul className="leaf-list mt-5">
          {service.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}

      {service.variant === "water" ? (
        <div className="mt-6 flex justify-center py-4">
          <WaterGlyph />
        </div>
      ) : null}

      {service.highlight ? (
        <p className="mt-5 rounded-2xl bg-cream px-5 py-4 text-sm text-forest">
          {service.highlight}
        </p>
      ) : null}

      {!service.highlight && !service.variant ? (
        <button
          type="button"
          className="link-arrow mt-6 self-start"
          onClick={openGiftModal}
        >
          Дэлгэрэнгүй
        </button>
      ) : null}
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Үйлчилгээ"
          title={
            <>
              Танд бэлдсэн <em>эрч хүчний аялал</em>
            </>
          }
          lead="Нэг удаагийн айлчлалд багтсан, бие сэтгэлийг сэргээх бүрэн туршлага."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.no} service={service} index={i} />
          ))}
        </div>

        <Reveal
          as="p"
          className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink/55"
        >
          Дээрх үйлчилгээнүүд нь амралт, тайвшрал, эрч хүчийг дэмжих зорилготой
          бөгөөд эмнэлгийн оношилгоо, эмчилгээг орлохгүй болно.
        </Reveal>
      </div>
    </section>
  );
}
