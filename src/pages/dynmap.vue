<template>
  <div class="container-fluid position-relative p-0 m-0">
    <iframe id="map" src="https://map.houkiserver.com"></iframe>
  </div>
</template>

<script>
export default {
  layout: 'dynmap'
}
</script>

<style scoped>
iframe#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
  width: 100%;
  height: calc(100vh - 56px);
}
</style>
