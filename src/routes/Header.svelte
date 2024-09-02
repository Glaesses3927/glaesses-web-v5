<script>
  import logo from '$lib/svelte-logo.svg';
</script>

<header class="flex p-3 pr-8 sm:pr-12 bg-white absolute top-0 w-full z-30">
  <div class="flex items-center">
    <img src={logo} class="h-10 w-10" alt="logo">
    <h1 class="text-lg leading-none">GlaessesWeb</h1>
  </div>
  <ul class="max-[640px]:hidden flex ml-auto">
    <li class="flex sm:my-auto sm:ml-6 text-gray-900 rounded hover:bg-gray-100">
      <a class="p-2 w-full text-center" href="/">Home</a>
    </li>
    <li class="flex sm:my-auto sm:ml-6 text-gray-900 rounded hover:bg-gray-100">
      <a class="p-2 w-full text-center" href="/webapps">WebApps</a>
    </li>
  </ul>
  <button type="button" class="z-30 sm:hidden ml-auto my-auto inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path>
    </svg>
  </button>
</header>