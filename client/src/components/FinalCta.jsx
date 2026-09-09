import { Reveal } from "./ui/Reveal.jsx";
import { useGiftModal } from "../context/giftModal.jsx";

export function FinalCta() {
  const { openGiftModal } = useGiftModal();

  return (
    <section className="on-dark relative overflow-hidden bg-forest-dark py-20 text-center text-white sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true">
        <svg
          viewBox="0 0 600 400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <path
            d="M60 400V60M60 240C20 220 -10 190 -30 150M60 180C110 155 150 120 180 70M60 120C25 104 5 80 -10 44"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M540 400V60M540 240C580 220 610 190 630 150M540 180C490 155 450 120 420 70"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Reveal className="container-x relative">
        <h2 className="text-[2.5rem] leading-[1.1] sm:text-6xl sm:leading-[1.08] lg:text-7xl">
          Өөртөө{" "}
          <br />
          <em>цаг гаргаарай.</em>
        </h2>
        <p className="mx-auto mt-8 text-lg leading-relaxed text-white/80">
          Таны амралт.
          <br />
          Таны эрч хүч.
          <br />
          Таны өөртөө зориулсан цаг.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className="btn btn--light btn--lg" onClick={openGiftModal}>
            Бэлгийн карт авах
          </button>
          <a href="#contact" className="btn btn--ghost-light btn--lg">
            Холбоо барих
          </a>
        </div>
      </Reveal>
    </section>
  );
}
