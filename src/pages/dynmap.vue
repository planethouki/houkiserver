<template>
  <div class="container-fluid p-0 m-0">
    <iframe src="https://map.houkiserver.com"></iframe>
  </div>
</template>

<script>
export default {
  layout: 'dynmap'
}
</script>

<style scoped>
iframe {
  width: 100%;
  border: 0;
  height: calc(100vh - 56px);
}
</style>
