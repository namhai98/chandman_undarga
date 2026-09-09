import { Reveal } from "./ui/Reveal.jsx";
import { JOURNEY } from "../data/content.js";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Туршлага</p>
          <h2 className="mt-4 text-4xl text-forest-dark sm:text-5xl">
            Нэг үйлчилгээ — <em>бүтэн туршлага</em>
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-sage-soft/50 bg-sage-soft/40 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {JOURNEY.map((step, i) => (
            <Reveal
              as="li"
              key={step.no}
              delay={i}
              className={[
                "flex flex-col gap-3 bg-white p-6 lg:p-7",
                i === 4 ? "sm:col-span-2 lg:col-span-1" : "",
              ].join(" ")}
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
