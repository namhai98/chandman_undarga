import { Reveal } from "./ui/Reveal.jsx";
import { GiftCardVisual } from "./GiftCardVisual.jsx";
import { useGiftModal } from "../context/giftModal.jsx";

export function GiftCard() {
  const { openGiftModal } = useGiftModal();

  return (
    <section
      id="gift"
      className="on-dark relative overflow-hidden bg-[linear-gradient(160deg,#245c43_0%,#163d2d_100%)] py-16 text-white sm:py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[36rem] w-[36rem] rounded-full bg-sage/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow eyebrow--light">Бэлгийн карт</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            Нэг картанд{" "}
            <br />
            <em>бүхэл бүтэн халамж</em>
          </h2>
          <p className="mt-6 text-lg font-medium text-sage-soft">
            50,000₮-ийн бэлгийн карт
          </p>
          <p className="mt-4 max-w-md text-white/80">
            Өөртөө авч болно. Ээждээ, аавдаа, ханьдаа, найздаа, хайртай хүндээ
            бэлэглэж болно.
          </p>
          <p className="mt-5 max-w-md border-l-2 border-sage-soft/60 pl-4 text-white/90">
            «Юу бэлэглэх вэ?» гэж бодож байгаа бол — өөртөө зориулах цагийг нь
            бэлэглээрэй.
          </p>
          <button
            type="button"
            className="btn btn--light btn--lg mt-8"
            onClick={openGiftModal}
          >
            Бэлгийн карт авах
          </button>
        </Reveal>

        <Reveal delay={1} className="flex justify-center lg:justify-end">
          <GiftCardVisual />
        </Reveal>
      </div>
    </section>
  );
}
