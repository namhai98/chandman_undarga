/**
 * Standard vertical rhythm + centered content column.
 * `tint` gives the section a solid white ground against the cream body.
 */
export function Section({ id, tint = false, className = "", children }) {
  return (
    <section
      id={id}
      className={[
        "py-16 sm:py-24 lg:py-32",
        tint ? "bg-white" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, align = "center" }) {
  const centered = align === "center";
  return (
    <header
      className={[
        "max-w-2xl",
        centered ? "mx-auto text-center" : "",
        "mb-12 sm:mb-14 lg:mb-20",
      ].join(" ")}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl sm:text-5xl text-forest-dark">{title}</h2>
      {lead ? (
        <p className="mt-5 text-lg text-ink/70 leading-relaxed">{lead}</p>
      ) : null}
    </header>
  );
}
