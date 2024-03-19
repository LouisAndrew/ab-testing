<template>
  <h1>Check out the Blinkist app</h1>

  <img width="300" src="/hero_image.jpg" alt="Check out the Blinkist app" />

  <slot />

  <div>
    Thanks a lot for reading the article! <a href="/signup" data-trackclick="true">SIGN UP</a> for
    Blinkist.
  </div>
</template>

<style scoped lang="postcss">
h1 {
  @apply text-2xl font-bold;
}

a {
  @apply text-blue-500 underline font-bold;
}
</style>
