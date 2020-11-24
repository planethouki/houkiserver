<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        ルール
      </div>
      <template v-if="menu == null">
        <b-spinner></b-spinner>
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

<script>
export default {
  data () {
    return {
      menu: null
    }
  },
  mounted () {
    Promise.all([
      fetch('https://houkiserverstats.z31.web.core.windows.net/menu.json')
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([menu]) => {
        setTimeout(() => {
          this.menu = menu
        }, 0)
      })
  }
}
</script>
