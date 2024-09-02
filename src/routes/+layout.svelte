<script>
  import "../app.css";
  import Header from "./Header.svelte";
</script>

<Header />
<main>
  <slot />
</main>

<style>
  main {
    margin-top: 72px;
  }
</style>