import { useState } from "react";
import { Reveal } from "./ui/Reveal.jsx";
import { CONTACT, FAQ } from "../data/content.js";

function AccordionItem({ item, open, onToggle }) {
  return (
    <div
      className="acc-item border-b border-sage-soft/50"
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg text-forest-dark"
      >
        <span>{item.q}</span>
        <span
          className={[
            "relative grid h-6 w-6 shrink-0 place-items-center transition-transform duration-300",
            open ? "rotate-45" : "",
          ].join(" ")}
          aria-hidden="true"
        >
          <span className="absolute h-[1.5px] w-4 bg-forest" />
          <span className="absolute h-4 w-[1.5px] bg-forest" />
        </span>
      </button>
      <div className="acc-panel">
        <p className="pb-6 pr-10 text-ink/70">{item.a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Түгээмэл асуулт</p>
          <h2 className="mt-4 text-4xl text-forest-dark sm:text-5xl">
            Асуулт <em>байна уу?</em>
          </h2>
          <p className="mt-5 text-ink/65">
            Хариултаа олохгүй бол{" "}
            <a href={CONTACT.phoneHref} className="text-forest underline">
              {CONTACT.phone}
            </a>{" "}
            дугаарт залгаарай.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-[1.5rem] border border-sage-soft/50 bg-white px-6 shadow-[var(--shadow-soft)] sm:px-8">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={item.q}
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
