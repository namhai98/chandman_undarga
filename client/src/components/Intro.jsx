import { Reveal } from "./ui/Reveal.jsx";
import { STATS } from "../data/content.js";

export function Intro() {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-card)]">
            <div className="media-art media-art--intro" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-4 py-1.5 text-xs font-medium text-forest-dark backdrop-blur">
              Тайван орчин · Дулаан гэрэл
            </span>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={1}>
          <p className="eyebrow">Бидний тухай</p>
          <h2 className="mt-4 text-4xl text-forest-dark sm:text-5xl">
            Зүгээр нэг үйлчилгээ биш.{" "}
            <br />
            <em>Өөртөө зориулсан цаг.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Өдөр тутмын ачааллаас түр холдож, тайвширч, бие болон сэтгэлдээ
            анхаарал хандуулах орон зай.
          </p>
          <p className="mt-4 text-ink/65">
            Чандмань Ундарга энергийн төв нь яаран сандрах ертөнцөөс ангид, зөвхөн
            танд зориулсан амгалан цаг хугацааг бүтээхийг зорьдог. Энд та зогсоод,
            амьсгалаа тэгшитгэж, эрч хүчээ дахин цэнэглэх боломжтой.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {STATS.map((stat, i) => (
              <Reveal
                as="li"
                key={stat}
                delay={i}
                className="rounded-full border border-sage-soft/70 bg-white px-4 py-2 text-sm font-medium text-forest"
              >
                {stat}
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
