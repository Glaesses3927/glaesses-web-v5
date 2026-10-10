<script lang="ts">
  import "../app.css";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import { browser } from "$app/environment";
  // %sveltekit.env.*% は実行時の環境変数を参照するため，Amplify の SSR では空になる．
  // ビルド時に埋め込まれる $env/static/public を使う．
  import {
    PUBLIC_GTAG_ID,
    PUBLIC_RECAPTCHA_SITE_KEY,
  } from "$env/static/public";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  // Google tag (gtag.js)
  if (browser && PUBLIC_GTAG_ID) {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", PUBLIC_GTAG_ID);
  }
</script>

<svelte:head>
  <!-- Google tag (gtag.js) -->
  <script
    async
    src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GTAG_ID}`}
  ></script>
  <!-- Recaptcha v3 -->
  <script
    src={`https://www.google.com/recaptcha/api.js?render=${PUBLIC_RECAPTCHA_SITE_KEY}`}
  ></script>
</svelte:head>

<Header />
<main class="bg-gray-100 font-noto">
  {@render children?.()}
</main>
<Footer />
