<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        ルール
      </div>
      <div v-for="m in menu" :key="m.key" class="mt-5">
        <div class="h5">
          {{ m.title }}
        </div>
        <div style="white-space: pre-line;">{{ m.body }}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: {}
    }
  },
  mounted () {
    Promise.all([
      fetch('https://houkiserverstats.z31.web.core.windows.net/menu.json')
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([menu]) => {
        this.menu = menu
      })
  }
}
</script>
