<script lang="ts">
  import MegIcon from "./MegIcon.svelte";

  export let title: string | undefined = "Authority mark";
  export let size: string | number = "1em";
</script>

<MegIcon name="authority_mark" {title} {size} />
