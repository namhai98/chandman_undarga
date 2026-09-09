import { Reveal } from "./ui/Reveal.jsx";
import { SectionHead } from "./ui/Section.jsx";
import { AUDIENCE } from "../data/content.js";

export function Audience() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Бэлэг"
          title={
            <>
              Хэнд бэлэглэж <em>болох вэ?</em>
            </>
          }
          lead="Халамж хэрэгтэй, амралт хүрэлцдэггүй хэн бүхэнд тохирсон дулаахан бэлэг."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {AUDIENCE.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={i}
              className="rounded-[1.25rem] border border-sage-soft/50 bg-cream p-7 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-3 text-xl text-forest-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/65">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
