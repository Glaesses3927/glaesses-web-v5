<script lang="ts">
  import logo from '$lib/svelte-logo.svg';
  import { base } from '$app/paths';

  let openMenu:Boolean = false;
  function controlMenu(next:Boolean) {
    openMenu = next;
  }
</script>

<header class="flex p-3 pr-8 sm:pr-12 bg-white absolute top-0 w-full z-20 shadow">
  <div class="flex items-center">
    <img src={logo} class="h-10 w-10" alt="logo">
    <h1 class="text-lg leading-none">GlaessesWeb</h1>
  </div>
  <ul class="max-[640px]:hidden flex ml-auto">
    <li class="flex sm:my-auto sm:ml-6 text-gray-900 rounded hover:bg-gray-100">
      <a class="p-2 w-full text-center" href="{base}/">Home</a>
    </li>
    <li class="flex sm:my-auto sm:ml-6 text-gray-900 rounded hover:bg-gray-100">
      <a class="p-2 w-full text-center" href="{base}/webapps">WebApps</a>
    </li>
  </ul>
  <button type="button" on:click={() => controlMenu(!openMenu)} class="z-20 sm:hidden ml-auto my-auto inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path>
    </svg>
  </button>
</header>

{#if openMenu}
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div on:click={() => controlMenu(false)} class="absolute top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.5)] z-10"></div>
<ul class="absolute right-0 inset-y-0 flex flex-col gap-2 p-4 pt-28 w-4/5 bg-gray-50 z-10 text-xl font-semibold">
  <li class="flex text-gray-900 rounded hover:bg-gray-100">
    <a class="p-2 pl-6 w-full" on:click={() => controlMenu(false)} href="{base}/">Home</a>
  </li>
  <li class="flex text-gray-900 rounded hover:bg-gray-100">
    <a class="p-2 pl-6 w-full" on:click={() => controlMenu(false)} href="{base}/webapps">WebApps</a>
  </li>
  <li>
    <hr class="w-4/5 h-[2px] mx-auto my-4 bg-gray-200 border-0 rounded">
  </li>
</ul>
{/if}