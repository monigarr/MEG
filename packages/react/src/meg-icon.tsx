import type { HTMLAttributes } from "react";
import { ICONS, type MegIconName } from "./icons.generated.js";

export type { MegIconName };

export interface MegIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: MegIconName;
  title?: string;
  size?: number | string;
}

function InlineSvg({
  svg,
  title,
  size = "1em",
  className,
  style,
  ...rest
}: {
  svg: string;
  title?: string;
  size?: number | string;
} & HTMLAttributes<HTMLSpanElement>) {
  const labeled = title
    ? svg.replace(/<svg\b/, `<svg role="img" aria-label="${escapeAttr(title)}"`)
    : svg.replace(/<svg\b/, `<svg aria-hidden="true"`);

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        lineHeight: 0,
        color: "currentColor",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: labeled }}
      {...rest}
    />
  );
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export function MegIcon({ name, title, size, ...rest }: MegIconProps) {
  const svg = ICONS[name];
  if (!svg) {
    return null;
  }
  return <InlineSvg svg={svg} title={title ?? String(name)} size={size} {...rest} />;
}
