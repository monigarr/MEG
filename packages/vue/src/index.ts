import { defineComponent, h, type PropType } from "vue";
import { ICONS, type MegIconName } from "./icons.generated.js";

export type { MegIconName };
export { ICONS };

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export const MegIcon = defineComponent({
  name: "MegIcon",
  props: {
    name: { type: String as PropType<MegIconName>, required: true },
    title: { type: String, default: undefined },
    size: { type: [Number, String], default: "1em" },
  },
  setup(props) {
    return () => {
      const svg = ICONS[props.name];
      if (!svg) return null;
      const labeled = props.title
        ? svg.replace(/<svg\b/, `<svg role="img" aria-label="${escapeAttr(props.title)}"`)
        : svg.replace(/<svg\b/, `<svg aria-hidden="true"`);
      return h("span", {
        class: "meg-icon",
        style: {
          display: "inline-flex",
          width: props.size,
          height: props.size,
          lineHeight: 0,
          color: "currentColor",
        },
        innerHTML: labeled,
      });
    };
  },
});

export const AuthorityMark = defineComponent({
  name: "AuthorityMark",
  setup(_, { attrs }) {
    return () =>
      h(MegIcon, {
        ...attrs,
        name: "authority_mark" as MegIconName,
        title: "Authority mark",
      });
  },
});

export const CertitudePoint = defineComponent({
  name: "CertitudePoint",
  setup(_, { attrs }) {
    return () =>
      h(MegIcon, {
        ...attrs,
        name: "certitude_point" as MegIconName,
        title: "Certitude point",
      });
  },
});
