<template>
  <section class="container">
    <h1>saisei</h1>
    <div class="screen">
      <iframe
        width="560"
        height="315"
        src="https://map.houkiserver.com/20240709-worldss/"></iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: "maps"
}
</script>

<style scoped>
.screen {
  position: relative;
  height: 0;
  padding-bottom: calc(100% * 9 / 16);
  overflow: hidden;
  margin-bottom: 2rem;
}

.screen iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
</style>
