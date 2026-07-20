<script lang="ts">
  import { ICONS, type MegIconName } from "./icons.generated";

  export let name: MegIconName;
  export let title: string | undefined = undefined;
  export let size: string | number = "1em";

  $: svg = ICONS[name] ?? "";
  $: labeled = !svg
    ? ""
    : title
      ? svg.replace(/<svg\b/, `<svg role="img" aria-label="${title.replace(/"/g, "&quot;")}"`)
      : svg.replace(/<svg\b/, `<svg aria-hidden="true"`);
</script>

{#if labeled}
  <span
    class="meg-icon"
    style="display:inline-flex;width:{size};height:{size};line-height:0;color:currentColor"
  >
    {@html labeled}
  </span>
{/if}
