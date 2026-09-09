import { Reveal } from "./ui/Reveal.jsx";
import { JOURNEY } from "../data/content.js";

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-36">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Туршлага</p>
          <h2 className="mt-4 text-4xl text-forest-dark sm:text-5xl">
            Нэг үйлчилгээ — <em>бүтэн туршлага</em>
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-sage-soft/50 bg-sage-soft/40 md:grid-cols-5">
          {JOURNEY.map((step, i) => (
            <Reveal
              as="li"
              key={step.no}
              delay={i}
              className="flex flex-col gap-3 bg-white p-7"
            >
              <span className="font-display text-2xl text-sage">{step.no}</span>
              <h3 className="text-xl text-forest-dark">{step.title}</h3>
              <p className="text-sm text-ink/65">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
