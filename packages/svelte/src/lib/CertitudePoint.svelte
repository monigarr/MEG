<script lang="ts">
  import MegIcon from "./MegIcon.svelte";

  export let title: string | undefined = "Certitude point";
  export let size: string | number = "1em";
</script>

<MegIcon name="certitude_point" {title} {size} />
