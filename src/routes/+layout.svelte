<script>
  import "../app.css";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  let { children } = $props();
</script>

<Header />
<main class="bg-gray-100 font-noto">
  {@render children?.()}
</main>
<Footer />