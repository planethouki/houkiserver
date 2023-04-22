<template>
  <div class="d-flex justify-content-between">
    <div style="font-size: 80%;">
      <span class="d-inline-block text-center" style="width: 2rem;" v-html="icon" />
      <span>{{ playerName }}</span>
    </div>
    <div style="font-size: 70%;">
      <span>{{ level }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  playerName: string,
  level: string,
  icon: string,
}>()
</script>

<style scoped>

</style>
