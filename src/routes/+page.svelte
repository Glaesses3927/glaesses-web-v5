<script>
  import bg from '$lib/image_city.png'
</script>

<section class="h-screen">
  <div class="absolute h-screen inset-0 overflow-hidden">
    <img class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-h-full min-w-full max-w-none" src={bg} alt="background">
    <div class="absolute top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.5)]"></div>
  </div>
  <div class="relative pt-96 pl-4 min-[900px]:pl-20 text-white">
    <h2 class="font-bold text-4xl min-[900px]:text-6xl leading-tight mb-16">Live Freely And Hold Dreams</h2>
    <p class="mb-6 text-lg sm:text-xl">This is Website of Glaesses.</p>
  </div>
</section>

<section class="h-28 flex justify-center items-center">
  <ul class="flex justify-center items-center text-xs">
    <li class="mx-1 py-1 px-2 rounded-full bg-gray-200 text-gray-800">WebDesign</li>
    <li class="mx-1 py-1 px-2 rounded-full bg-purple-100 text-purple-800">UI/UX</li>
    <li class="mx-1 py-1 px-2 rounded-full bg-blue-100 text-blue-800">Front/Back</li>
    <li class="mx-1 py-1 px-2 rounded-full bg-red-100 text-red-800">Photo</li>
  </ul>
</section>

<section class="max-w-[900px] p-8 mx-auto flex flex-col justify-center items-center">
  <h2 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 ">PORTFOLIO</h2>
  <div class="grid min-[900px]:grid-cols-2 gap-6">
    <div class="flex flex-col border-2 border-gray-300 rounded-xl p-6">
      <h3 class="font-bold">
        <div class="text-lg">Portfolio</div>
      </h3>
      <p class="text-gray-800">Glaessesのポートフォリオサイトです。</p>
      <p>仕様技術 : Svelte</p>
    </div>
    <div class="flex flex-col border-2 border-gray-300 rounded-xl p-6">
      <h3 class="font-bold">
        <div class="text-lg">WebApps</div>
      </h3>
      <p class="text-gray-800">現在1つのWebアプリケーションが作成されています。詳しくは右上のボタンから。</p>
    </div>
  </div>
</section>