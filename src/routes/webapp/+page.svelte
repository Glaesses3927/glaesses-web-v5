<script>
  import bg from '$lib/image_city.png'
</script>

<section class="h-40">
  <div class="absolute h-40 inset-0 overflow-hidden">
    <img class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-h-40 min-w-full max-w-none" src={bg} alt="background">
    <div class="absolute top-0 left-0 w-full h-40 bg-[rgb(0,0,0,0.5)]"></div>
  </div>
  <div class="relative pt-24 pl-4 min-[900px]:pl-20 text-white">
    <h2 class="font-bold text-4xl min-[900px]:text-4xl leading-tight mb-16">WebApp</h2>
  </div>
</section>

<section class="max-w-[900px] p-8 mx-auto flex flex-col justify-center items-center">
  <div class="grid min-[900px]:grid-cols-1 gap-6">
    <div class="flex flex-col border-2 border-gray-300 rounded-xl p-6 bg-white shadow">
      <h3 class="font-bold">
        <div class="text-lg">BucketBox</div>
      </h3>
      <p class="text-gray-800">死ぬまでにやりたいことリストを作成・管理するアプリです。</p>
      <p class="text-gray-500 text-xs">React, Redux, TailwindCSS, Flowbite, Auth0, nodejs(Express)</p>
      <a href="https://glaesses.net/webapps/bucketbox" class="flex items-center justify-center px-5 py-2 mx-4 mt-4 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
        TRY IT!
        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </a>
    </div>
  </div>
</section>