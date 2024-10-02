<script>
  import "../app.css";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<Header />
<main class="bg-gray-100 font-noto">
  <slot />
</main>
<Footer />