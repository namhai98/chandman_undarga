import { useReveal } from "../../hooks/useReveal.js";

/**
 * Wraps children and fades them up the first time they enter the viewport.
 * `delay` is a stagger index (multiplied by 90ms in CSS).
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  style,
  delay = 0,
  children,
  ...rest
}) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      data-reveal
      className={className}
      style={{ "--i": delay, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
