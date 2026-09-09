import { Reveal } from "./ui/Reveal.jsx";
import { GALLERY } from "../data/content.js";

const SPAN = {
  0: "sm:col-span-2 sm:row-span-2",
  2: "lg:col-span-2",
  5: "sm:col-span-2",
  7: "lg:col-span-2",
};

export function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28 lg:py-36">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Орчин</p>
          <h2 className="mt-4 text-4xl text-forest-dark sm:text-5xl">
            Амгалан <em>орон зай</em>
          </h2>
        </Reveal>
      </div>

      <div className="container-x mt-12">
        <div className="grid auto-rows-[13rem] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY.map((item, i) => (
            <Reveal
              as="figure"
              key={item.variant}
              delay={i % 4}
              className={[
                "group relative overflow-hidden rounded-[1.25rem]",
                SPAN[i] ?? "",
              ].join(" ")}
            >
              <div
                className={`media-art media-art--${item.variant} transition-transform duration-700 group-hover:scale-105`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-forest-dark/70 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.label}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
