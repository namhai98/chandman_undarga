import { Reveal } from "./ui/Reveal.jsx";
import { useGiftModal } from "../context/giftModal.jsx";

function Botanical({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 520"
      fill="none"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <path d="M150 520V150" stroke="currentColor" strokeWidth="2" />
      <path
        d="M150 380C110 358 82 336 58 292M150 300C188 280 214 258 236 214M150 240C118 224 96 204 78 168M150 168c-14-10-22-24-24-46 22 6 36 20 42 44M150 168c14-10 22-24 24-46-22 6-36 20-42 44"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  const { openGiftModal } = useGiftModal();

  return (
    <section
      id="home"
      className="on-dark relative flex min-h-[100svh] items-center overflow-hidden text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#2c6a4e_0%,#1d4a37_45%,#163d2d_100%)]" />
        <div className="absolute -left-24 top-10 h-[32rem] w-[32rem] rounded-full bg-sage/25 blur-[120px]" />
        <div className="absolute -right-16 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#3f8a63]/30 blur-[130px]" />
        <Botanical className="absolute -left-10 bottom-0 h-[80%] w-auto text-white/10" />
        <Botanical className="absolute -right-12 bottom-0 h-[62%] w-auto text-white/[0.07]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,rgba(22,61,45,0.55)_100%)]" />
      </div>

      <div className="container-x py-28 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow eyebrow--light">
            Чандмань Ундарга · Энергийн төв
          </Reveal>

          <Reveal
            as="h1"
            delay={1}
            className="mt-5 text-[2.4rem] leading-[1.1] text-balance sm:mt-6 sm:text-6xl sm:leading-[1.08] lg:text-7xl"
          >
            Танд ч, таны хайртай хүнд ч <em>өөртөө зориулах цаг</em>
          </Reveal>

          <Reveal
            as="p"
            delay={2}
            className="mt-6 max-w-xl text-base text-white/80 sm:mt-7 sm:text-xl"
          >
            Эрч хүч, амралт, тайвшралыг нэг дор мэдрэх жижигхэн аялал.
          </Reveal>

          <Reveal
            delay={3}
            className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap"
          >
            <a href="#services" className="btn btn--light btn--lg">
              Үйлчилгээнүүдтэй танилцах
            </a>
            <button
              type="button"
              className="btn btn--ghost-light btn--lg"
              onClick={openGiftModal}
            >
              50,000₮-ийн бэлгийн карт
            </button>
          </Reveal>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Доош гүйлгэх">
        <span className="scroll-cue__label">Доош гүйлгэ</span>
        <span className="scroll-cue__line">
          <span className="scroll-cue__dot" />
        </span>
      </a>
    </section>
  );
}
