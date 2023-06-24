<template>
  <div class="col col-12 col-sm-12 col-md-6 col-lg-4 py-2 px-2">
    <div class="card p-3" style="height: 100%;">
      <div class="h5 card-title">
        {{ title }}
      </div>
      <div class="card-text" style="white-space: pre-line;">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
}>()
</script>

<style scoped>

</style>
