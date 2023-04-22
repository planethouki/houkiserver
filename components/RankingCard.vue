<template>
  <div class="col col-12 col-sm-6 col-md-4 col-lg-3 py-2 px-2">
    <div class="card p-3">
      <h6 class="card-title">
        {{ title }}
      </h6>
      <div class="card-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string | "",
}>()
</script>

<style scoped>

</style>
