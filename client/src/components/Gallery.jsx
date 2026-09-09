import { Reveal } from "./ui/Reveal.jsx";
import { GALLERY } from "../data/content.js";

// Feature tile from tablet up; one wide accent tile on desktop. On mobile every
// tile is a uniform square so the grid can never break.
const SPAN = {
  0: "sm:col-span-2 sm:row-span-2",
  3: "lg:col-span-2",
};

export function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Орчин</p>
          <h2 className="mt-4 text-4xl text-forest-dark sm:text-5xl">
            Амгалан <em>орон зай</em>
          </h2>
        </Reveal>
      </div>

      <div className="container-x mt-10 sm:mt-12">
        <div className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[14rem] lg:grid-cols-4">
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
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/75 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100">
                {item.label}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
