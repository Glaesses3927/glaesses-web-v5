<script>
  import bg from "$lib/image_city.png";
  import apps from "$lib/webapps.json";
</script>

<section class="h-40">
  <div class="absolute h-40 inset-0 overflow-hidden">
    <img
      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-h-40 min-w-full max-w-none"
      src={bg}
      alt="background"
    />
    <div class="absolute top-0 left-0 w-full h-40 bg-[rgb(0,0,0,0.5)]"></div>
  </div>
  <div class="relative pt-24 pl-4 min-[900px]:pl-20 text-white">
    <h2 class="font-bold text-4xl min-[900px]:text-4xl leading-tight mb-16">
      WebApps
    </h2>
  </div>
</section>

<section
  class="max-w-[900px] p-8 mx-auto flex flex-col justify-center items-center"
>
  <div class="grid min-[900px]:grid-cols-1 gap-6">
    {#each apps as app}
      <div
        class="flex flex-col border-2 border-gray-300 rounded-xl p-6 bg-white shadow"
      >
        <h3 class="font-bold">
          <div class="text-lg">{app.name}</div>
        </h3>
        <p class="text-gray-800 text-sm">
          {app.description}
        </p>
        {#if app.note}
          <p class="text-red-600 text-xs">{app.note}</p>
        {/if}
        <p class="text-gray-500 text-xs">{app.stack}</p>
        <a
          href={app.url}
          class="flex items-center justify-center px-5 py-2 mx-4 mt-4 text-center font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          TRY IT!
        </a>
      </div>
    {/each}
  </div>
</section>
