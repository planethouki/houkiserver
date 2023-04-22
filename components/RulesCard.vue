<template>
  <div class="mt-5">
    <div class="h5">
      {{ title }}
    </div>
    <div style="white-space: pre-line;">
      {{ body }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  body: string,
}>()
</script>

<style scoped>

</style>
