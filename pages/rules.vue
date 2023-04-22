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
        <template v-for="m in menu" :key="m.key">
          <RulesCard :title="m.title" :body="m.body" />
        </template>
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
