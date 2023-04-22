<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        ルール
      </div>
      <template v-if="menu.length === 0">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </template>
      <template v-else>
        <div v-for="m in menu" :key="m.key" class="mt-5">
          <div class="h5">
            {{ m.title }}
          </div>
          <div style="white-space: pre-line;">{{ m.body }}</div>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup>

const menu = reactive([])

$fetch('/api/serverStats/menu')
  .then((menuRes) => {
    menuRes.forEach((item) => {
      menu.push(item)
    })
  })

</script>
