<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/@gitgraph/js"></script>
</svelte:head>

<script>
  import bg from '$lib/image_city.png';
  import test from '$lib/works_001.png';
  import { onMount } from 'svelte';
  onMount(() => {
    const graphContainer = document.getElementById("graph-container");
    const options = {
      orientation: "vertical-reverse",
      responsive: true,
      // @ts-ignore
      template: GitgraphJS.templateExtend("metro", {
        commit: {
          message: {
            displayAuthor: false,
            displayHash: false,
          },
        },
        colors:["gray", "#F05A7E", "#125B9A", "#0B8494"]
      }),
    }
    // @ts-ignore
    const gitgraph = GitgraphJS.createGitgraph(graphContainer, options);

    const main = gitgraph.branch("main");
    main.commit("Born in Kagoshima (20YY/MM)");
    const school = main.branch("school");
    school.commit("Join University in Osaka (2022/04)");
    const jobs1 = school.branch("jobs1");
    jobs1.commit("Start being USJ crew (2022/05)");
    jobs1.commit("Finish being USJ crew (2022/08)");
    jobs1.commit("Start being USJ crew (2022/11)");
    // school.merge({ branch: jobs1, commitOptions: {subject: " ",}});
    main.commit("2024/10").tag("now");
  });
</script>

<style>
  .texts span {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    animation: shifttext 10s linear infinite;
  }
  @keyframes shifttext {
    0%{opacity: 0;}
    1%,25%{opacity: 1;top: 0;}
    26%,50%{top: -6rem;}
    51%,75%{top: -12rem;}
    76%,100%{top: -18rem;}
  }
  #graph-container {
    padding-bottom: 2rem !important;
  }
  .works:hover > div {
    opacity: 1;
  }
</style>

<section class="h-screen">
  <div class="absolute h-screen inset-0 overflow-hidden">
    <img class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-h-full min-w-full max-w-none" src={bg} alt="background">
    <div class="absolute top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.5)]"></div>
  </div>
  <div class="relative pt-80 pl-4 min-[1400px]:pl-20 text-white">
    <h2 class="font-bold leading-normal text-4xl min-[1400px]:text-[4rem] mb-16">
      <p class="inline-block align-top">Hi!👋 I </p>
      <p class="texts inline-block align-top w-[300px] min-[1400px]:w-[500px] h-[6rem] overflow-y-hidden">
        <span>am a student.</span>
        <span>like coding.</span>
        <span>hate studying.</span>
        <span>like webdesign.</span>
      </p>
    </h2>
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

<section class="p-8 mx-auto flex flex-col justify-center items-center mb-12">
  <figure class="max-w-screen-md mx-auto text-center">
    <svg class="w-10 h-10 mx-auto mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
    <blockquote>
        <p class="text-lg lg:text-2xl italic font-medium text-gray-900">
          "Loser be like a loser .... They find themselves inferior in every way to others and eventually lose sight of the value of their existence. Finding it is the purpose and meaning of life."
        </p>
    </blockquote>
</figure>
</section>

<hr class="w-56 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10">

<section class="max-w-[500px] p-8 mx-auto flex flex-col justify-center items-center">
  <h2 class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 relative"><p class="relative z-[1]">History.</p><div class="absolute h-[10px] inset-x-0 bottom-0 bg-red-300 opacity-60"/></h2>
  <div id="graph-container"></div>
</section>

<section class="max-w-[900px] p-8 mx-auto flex flex-col justify-center items-center">
  <h2 class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 relative"><p class="relative z-[1]">Portfolio.</p><div class="absolute h-[10px] inset-x-0 bottom-0 bg-blue-300 opacity-60"/></h2>
  <div class="flex flex-wrap gap-5 justify-center">
    <div class="works flex flex-col shadow w-[320px] h-[180px] relative rounded-xl">
      <img src={test} alt="works" class="rounded-xl"/>
      <div class="absolute inset-0 bg-[rgb(0,0,0,0.7)] opacity-0 text-white p-6 content-center transition rounded-xl">
        <h3 class="font-bold relative">
          <div class="text-2xl mb-4">Portfolio</div>
        </h3>
        <p class="">Glaessesのポートフォリオサイトです。</p>
      </div>
    </div>
    <div class="works flex flex-col shadow w-[320px] h-[180px] relative rounded-xl">
      <div class="flex items-center justify-center w-full h-full bg-gray-300 rounded-xl">
        <svg class="w-20 h-20 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
      </div>
      <div class="absolute inset-0 bg-[rgb(0,0,0,0.7)] opacity-0 text-white p-6 content-center transition rounded-xl">
        <h3 class="font-bold relative">
          <div class="text-2xl mb-4">WebApp</div>
        </h3>
        <p class="">現在1つのWebアプリケーションが作成されています。詳しくは右上のボタンから。</p>
      </div>
    </div>
  </div>
</section>